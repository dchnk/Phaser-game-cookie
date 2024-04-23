export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    
    this.playerSpeed = 160;
    this.direction = 'bottom';

    // Добавляем игрока в сцену
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Включаем физику для игрока
    this.body.setCollideWorldBounds(true);

    // Инициализируем анимации игрока
    this.initAnimations();

    // Устанавливаем параметры игрока
    this.body.setBounce(0.2);
  }

  initAnimations() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 15, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 22, end: 27 }),
      frameRate: 10,
      repeat: -1
    },);

    this.scene.anims.create({
      key: 'top',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 15, end: 20 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'bottom',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 22, end: 27 }),
      frameRate: 10,
      repeat: -1
    },);
  }

  update(cursors) {
    // Управление игроком с помощью стрелок
    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.playerSpeed);
      this.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.playerSpeed);
      this.play('right', true);
    } else {
      // Выполняем если игрок стоит
      this.body.setVelocityX(0);
      this.anims.stop();
    }

    // Прыжок и другие действия
    if (cursors.up.isDown && this.body.touching.down) {
      this.body.setVelocityY(-330);
    }
    
    this.body.velocity.normalize().scale(0);
  }
}