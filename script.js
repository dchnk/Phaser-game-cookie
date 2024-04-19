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
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
}

// const game = new Phaser.Game(config);
new Phaser.Game(config);

let player, platforms, cursors;

function preload() {
  this.load.image('map', './src/img/map.png');
  this.load.spritesheet('cook',
    './src/img/cook-sprite-full.png',
    { frameWidth: 60, frameHeight: 90 }
  );
}

function create() {
  this.add.image(-100, -100, 'map').setOrigin(0, 0);
  console.log(this)

  platforms = this.physics.add.staticGroup();

  player = this.physics.add.sprite(500, 500, 'cook');
  // player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('cook', { start: 15, end: 20 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'left-stop',
    frames: [ { key: 'cook', frame: 14 } ],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('cook', { start: 22, end: 27 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'top',
    frames: this.anims.generateFrameNumbers('cook', { start: 1, end: 20 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'bottom',
    frames: this.anims.generateFrameNumbers('cook', { start: 21, end: 27 }),
    frameRate: 10,
    repeat: -1
  });


  cursors = this.input.keyboard.createCursorKeys();
}

function update() {

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  // else {
  //   player.setVelocityX(0);

  //   player.anims.play('turn');
  // }

  if (cursors.up.isDown) {
    player.setVelocityY(-330);
  }
}