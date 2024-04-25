import Phaser from 'phaser';
import GameMap from '../game-objects/GameMap';
import Player from '../game-objects/Player';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Загружаем статичные изображения
    this.load.image('map', '/src/game/assets/map.png');
    this.load.image('cookie', '/src/game/assets/cookies/1.png');

    // Загружаем спрайты
    this.load.spritesheet('hero',
      '/src/game/assets/spritesheets/cook-sprite-full.png',
      { frameWidth: 60, frameHeight: 90 }
    );
  }

  create() {
    // Создаем карту игрового мира и центрируем ее
    this.gameMap = new GameMap(this, 'map');
    this.physics.world.setBounds(0, 0, 1200, 1200)

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
    this.player.update(this.cursors)
  }
}

export default MainScene;