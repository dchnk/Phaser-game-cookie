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
    // Создаем карту игрового мира
    this.gameMap = new GameMap(this, 'map');
    
    // Cоздаем персонажа по середине поля
    this.player = new Player(this, this.cameras.main.centerX, this.cameras.main.centerY, 'hero');
    
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  
  update() {
    this.player.update(this.cursors)
  }
}

export default MainScene;