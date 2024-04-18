import './style.css';
import Phaser from 'phaser';

const config = {
  width: '1000',
  height: '1000',
  title: 'Phaser Cookie Game + TS',
  type: Phaser.AUTO,
  parent: document.querySelector('.main'),
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  // physics: {
  //   default: 'arcade',
  //   arcade: {
  //     gravity: { y: 300 },
  //     debug: false
  //   }
  // },
}

// const game = new Phaser.Game(config);
new Phaser.Game(config);

function preload() {
  this.load.image('map', './src/img/map.png');
  this.load.spritesheet('cook',
    './src/img/cook-sprite-full.png',
    { frameWidth: 60, frameHeight: 90 }
  );
}

function create() {
  this.add.image(-100, -100, 'map').setOrigin(0, 0);
}

function update() {
}