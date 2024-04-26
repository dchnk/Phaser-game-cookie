export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.playerVelocity = 160;
    this.direction = 'bottom';
    this.isMoving = false;

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
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 1, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 8, end: 13 }),
      frameRate: 10,
      repeat: -1
    },);

    this.scene.anims.create({
      key: 'stop',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 0 }),
      frameRate: 10,
    },);
  }

  update(cursors) {
    // Комбинации клавиш для диагонального движения
    if (cursors.left.isDown && cursors.up.isDown) {
      this.move('up-left');
    } else if (cursors.left.isDown && cursors.down.isDown) {
      this.move('down-left');
    } else if (cursors.right.isDown && cursors.up.isDown) {
      this.move('up-right');
    } else if (cursors.right.isDown && cursors.down.isDown) {
      this.move('down-right');
    }

    // Одиночные клавиши для прямого движения
    else if (cursors.left.isDown) {
      this.move('left');
    } else if (cursors.right.isDown) {
      this.move('right');
    } else if (cursors.up.isDown) {
      this.move('up');
    } else if (cursors.down.isDown) {
      this.move('down');
    } else {
      this.move('stop');
    }

    // Нормализация скорости движения во всех напрвлениях
    this.body.velocity.normalize().scale(this.playerVelocity);
  }

  move(direction, impuls) {
    this.isMoving = direction === 'stop' ? false : true;
  
    // Сброс скоростей
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);

    this.direction = direction;

    if (impuls) {
      if (impuls.x + impuls.y === 0) {
        this.anims.play('stop', true);
        this.anims.stop();
        return;
      };

      this.body.setVelocityX(this.playerVelocity * impuls.x);
      this.body.setVelocityY(this.playerVelocity * impuls.y * -1);
      this.anims.play(direction, true);
      return;
    }


    switch (direction) {
      case 'left':
        this.body.setVelocityX(-this.playerVelocity);
        this.anims.play('left', true);
        break;

      case 'right':
        this.body.setVelocityX(this.playerVelocity);
        this.anims.play('right', true);
        break;

      case 'up':
        this.body.setVelocityY(-this.playerVelocity);
        this.anims.play('up', true);
        break;

      case 'down':
        this.body.setVelocityY(this.playerVelocity);
        this.anims.play('down', true);
        break;

      case 'up-left':
        this.body.setVelocityX(-this.playerVelocity);
        this.body.setVelocityY(-this.playerVelocity);
        this.anims.play('up', true);
        break;

      case 'up-right':
        this.body.setVelocityX(this.playerVelocity);
        this.body.setVelocityY(-this.playerVelocity);
        this.anims.play('up', true);
        break;

      case 'down-left':
        this.body.setVelocityX(-this.playerVelocity);
        this.body.setVelocityY(this.playerVelocity);
        this.anims.play('down', true);
        break;

      case 'down-right':
        this.body.setVelocityX(this.playerVelocity);
        this.body.setVelocityY(this.playerVelocity);
        this.anims.play('down', true);
        break;


      default:
        this.anims.play('stop', true)
        this.anims.stop();
        break;
    }
  }
}