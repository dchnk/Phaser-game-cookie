export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.playerVelocity = 160;
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
    
    // Изменение размеров коллизии персонажа
    this.body.setSize(60, 20, false);
    
    // Смещение коллизии персонажа по оси y
    this.body.setOffset(0, 70);
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
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 1, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'bottom',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 8, end: 14 }),
      frameRate: 10,
      repeat: -1
    },);
  }

  update(cursors) {
    // Управление игроком с помощью стрелок
    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.playerVelocity);
      this.direction = 'left';
      this.anims.play('left', true);

    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.playerVelocity);
      this.direction = 'right';
      this.play('right', true);

    } else if (cursors.down.isDown) {
      this.body.setVelocityY(this.playerVelocity)
      this.direction = 'right';
      this.play('right', true);

    } else if (cursors.up.isDown) {
      this.body.setVelocityY(-this.playerVelocity);
      this.direction = 'right';
      this.play('right', true);

    } else {
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.anims.stop();
    }

    // Прыжок и другие действия
    if (cursors.up.isDown) {
      this.body.setVelocityY(-this.playerVelocity);
    } else if (cursors.down.isDown) {

    }

    this.body.velocity.normalize().scale(this.playerVelocity);
  }
}