import Phaser from 'phaser';
import GameMap from '../game-objects/GameMap';
import Player from '../game-objects/Player';
import Joystick from '../utils/joystick';

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

    // Добавляем коллизии между героем и стенами
    this.physics.add.collider(this.player, this.gameMap.walls);

    // Закрепляем камеру на персонаже и ограничиваем ее размерами карты
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(this.gameMap.x, this.gameMap.y, this.gameMap.width, this.gameMap.height);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.joystick.active ? this.player.move(this.joystick.direction, this.joystick.impuls) : this.player.update(this.cursors);
    // this.player.isMoving ? this.cameras.main.zoomTo(0.9, 100, 'Sine.easeInOut') : this.cameras.main.zoomTo(1, 200,'Sine.easeIn');
  }
}

export default MainScene;