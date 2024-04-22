import { gameState } from "../../../stores/gameState";

export function create() {
  
  this.add.image(-100, -100, 'map').setOrigin(0, 0);


  // Create walls
  let walls = this.physics.add.staticGroup();
  gameState.setWalls(walls);
    
  let player = this.physics.add.sprite(500, 500, 'cook');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);  
  gameState.setPlayer(player);

  let cookies = this.physics.add.group({
    key: 'cookie',
    repeat: 11,
    setXY: { x: 50, y: 0, stepX: 70 }
  });

  cookies.children.iterate(function (child) {
    child.scale = .2;

    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    child.setCollideWorldBounds(true);

  });

  this.physics.add.collider(cookies, player, () => { })

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('cook', { start: 15, end: 20 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'left-stop',
    frames: [{ key: 'cook', frame: 14 }],
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


  let cursors = this.input.keyboard.createCursorKeys();
  gameState.setCursors(cursors);
}