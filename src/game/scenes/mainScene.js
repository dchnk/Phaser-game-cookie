import Phaser from 'phaser';
import GameMap from '../game-objects/GameMap';
import Player from '../game-objects/Player';
import Joystick from '../utils/joystick';
import Cookie from '../game-objects/Cookie';
import Car from '../game-objects/Cars';
import { ResourceLoader } from '../loader/ResourceLoader';
import { CookieFactory } from '../factories/CookieFactory';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    ResourceLoader.preload(this);
  }

  create() {
    // Создаем joystick
    this.joystick = new Joystick();

    // Указываем первоначальное состояние зума
    // this.cameras.main.setZoom(1);

    // Создаем карту игрового мира и центрируем ее
    this.gameMap = new GameMap(this, 'map');
    // Жестко указываем границы игрового поля
    // this.physics.world.setBounds(0, 0, this.gameMap.width, this.gameMap.height);
    this.physics.world.setBounds(0, 0, this.gameMap.width, this.gameMap.height, true, true, true, true);

    // Cоздаем персонажа по середине поля
    this.player = new Player(this, this.gameMap.mapImage.width / 2, this.gameMap.mapImage.height / 2, 'hero');
    // Устанавливаем глубину отрисовки, чтобы персонаж всегда отрисовывался поверх всех слоев
    this.player.setDepth(10);

    // Создаем физическую группу для печенек
    this.cookies = this.physics.add.group({
      classType: Cookie,
    });


    // Создаем физическую группу для машинок
    this.cars = this.physics.add.group({
      classType: Car,
    });

    // Закрепляем камеру на персонаже и ограничиваем ее размерами карты
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(this.gameMap.x, this.gameMap.y, this.gameMap.width, this.gameMap.height);

    // Создаем печеньку

    CookieFactory.createCookie(this);

    // Создание таймера для регулярного создания печеньек
    this.time.addEvent({
      delay: 3000, // Генерация каждые 3 секунды
      callback: this.createCar,
      callbackScope: this,
      loop: true,
    });

    // this.time.addEvent({
    //   delay: 3000, // Генерация каждые 3 секунды
    //   callback: CookieFactory.createCookie(this),
    //   callbackScope: this,
    //   loop: true,
    // });

    // Добавляем коллизии между героем и стенами
    this.physics.add.collider(this.player, this.gameMap.walls)

    this.physics.add.overlap(this.player, this.cookies, this.collectCookie, null, this)

    this.physics.add.collider(this.player, this.cookies);

    this.physics.add.collider(this.cookies, this.gameMap.walls, (cookie, wall) => {
      // Рассчитаем угол направления отталкивания

      if (!cookie.animateIsDone) return;
      const angle = Phaser.Math.Angle.Between(cookie.x, cookie.y, this.player.body.x, this.player.body.y);
      // Применяем силу к объекту
      this.physics.velocityFromRotation(angle, 180, cookie.body.velocity);
    }, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }


  update() {
    this.joystick.active ? this.player.move(this.joystick.direction, this.joystick.impuls) : this.player.update(this.cursors);
  }

  // createCookie() {
  //   if (this.cookies.children.size > 3) return;

  //   const x = Phaser.Math.Between(this.gameMap.cookiesArea.startX, this.gameMap.cookiesArea.endX);
  //   const y = Phaser.Math.Between(this.gameMap.cookiesArea.startY, this.gameMap.cookiesArea.endY);

  //   this.cookies.add(new Cookie(this, x, y, 'cookie'));
  // }

  createCar() {
    if (this.cars.children.size > 0) return;

    // const x = Phaser.Math.Between(this.gameMap.cookiesArea.startX, this.gameMap.cookiesArea.endX);
    // const y = Phaser.Math.Between(this.gameMap.cookiesArea.startY, this.gameMap.cookiesArea.endY);

    const x = 400;
    const y = this.gameMap.wallsCollisions.startY;

    this.cars.add(new Car(this, x, y, 'car-front'));
  }

  collectCookie(player, cookie) {
    if (!cookie.animateIsDone) return;
    if (player.heldCookie) return;

    cookie.body.setCollideWorldBounds(false);

    // Останавливаем анимацию смерти печеньки
    cookie.stopFadeOut()
    // Передаем ссылку на печеньку в объект персонажа
    player.heldCookie = cookie;
    // Удаляем печеньки из статик группы печенек на поле
    this.cookies.remove(cookie);
  }
}

export default MainScene;