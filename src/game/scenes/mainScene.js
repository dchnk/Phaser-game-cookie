import Phaser from 'phaser';
import GameMap from '../game-objects/GameMap';
import Player from '../game-objects/Player';
import Joystick from '../utils/joystick';
import Cookie from '../game-objects/Cookie';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Загружаем статичные изображения
    this.load.image('map', 'src/game/assets/map.png');
    this.load.image('cookie', 'src/game/assets/cookies/1.png');

    // Загружаем спрайты
    this.load.spritesheet('hero',
      'src/game/assets/spritesheets/cook-sprite-full.png',
      { frameWidth: 60, frameHeight: 90 }
    );
  }

  create() {
    // Создаем joystick
    this.joystick = new Joystick();

    // Указываем первоначальное состояние зума
    this.cameras.main.setZoom(1);

    // Создаем карту игрового мира и центрируем ее
    this.gameMap = new GameMap(this, 'map');
    // Жестко указываем границы игрового поля
    this.physics.world.setBounds(0, 0, this.gameMap.width, this.gameMap.height);

    // Cоздаем персонажа по середине поля
    this.player = new Player(this, this.gameMap.mapImage.width / 2, this.gameMap.mapImage.height / 2, 'hero');
    // Устанавливаем глубину отрисовки, чтобы персонаж всегда отрисовывался поверх всех слоев
    this.player.setDepth(10);

    // Создаем физическую группу для печенек
    this.cookies = this.physics.add.group({
      classType: Cookie,
    });

    // Добавляем коллизии между героем и стенами
    this.physics.add.collider(this.player, this.gameMap.walls);

    // Закрепляем камеру на персонаже и ограничиваем ее размерами карты
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(this.gameMap.x, this.gameMap.y, this.gameMap.width, this.gameMap.height);

    // Создаем печеньку

    this.createCookie();

    // Создание таймера для регулярного создания печеньек
    this.time.addEvent({
      delay: 3000, // Генерация каждые 3 секунды
      callback: this.createCookie,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(this.player, this.cookies, this.collectCookie, null, this)

    this.physics.add.collider(this.cookies, this.gameMap.walls);

    this.physics.add.collider(this.player, this.cookies);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.joystick.active ? this.player.move(this.joystick.direction, this.joystick.impuls) : this.player.update(this.cursors);
    // this.player.isMoving ? this.cameras.main.zoomTo(0.9, 100, 'Sine.easeInOut') : this.cameras.main.zoomTo(1, 200,'Sine.easeIn');



    // if (this.player.heldCookie) {

    //   console.log(this.player.heldCookie)

    //   this.player.heldCookie.stopFadeOut()

    //   // Обновляем позицию печеньки, чтобы она следовала за персонажем
    //   this.player.heldCookie.x = this.player.x - 30;
    //   this.player.heldCookie.y = this.player.y + 10; // Смещение на 20 пикселей выше центра персонажа
    // }
  }

  createCookie() {
    if (this.cookies.children.size > 3) return;

    // const x = Phaser.Math.Between(this.gameMap.cookiesArea.startX, this.gameMap.cookiesArea.endX);
    // const y = Phaser.Math.Between(this.gameMap.cookiesArea.startY, this.gameMap.cookiesArea.endY);

    const x = Phaser.Math.Between(480, 500);
    const y = Phaser.Math.Between(480, 500);

    this.cookies.add(new Cookie(this, x, y, 'cookie'));
  }

  collectCookie(player, cookie) {


    if (!cookie.animateIsDone) return;
    if (this.player.heldCookie) return;

    // Сохраняем ссылку на "собранную" печеньку в свойствах персонажа
    player.heldCookie = cookie;
  }
}

export default MainScene;