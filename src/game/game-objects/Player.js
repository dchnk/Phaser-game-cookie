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
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 1, end: 6 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'bottom',
      frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 8, end: 13 }),
      frameRate: 10,
      repeat: -1
    },);
  }

  update(cursors) {
    // Сброс скоростей
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);

    // Комбинации клавиш для диагонального движения
    if (cursors.left.isDown && cursors.up.isDown) {
      this.moveDiagonal('left', 'up');
    } else if (cursors.left.isDown && cursors.down.isDown) {
      this.moveDiagonal('left', 'down');
    } else if (cursors.right.isDown && cursors.up.isDown) {
      this.moveDiagonal('right', 'up');
    } else if (cursors.right.isDown && cursors.down.isDown) {
      this.moveDiagonal('right', 'down');
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
      // Остановка анимации и движения
      this.anims.stop();
    }

    this.body.velocity.normalize().scale(this.playerVelocity);
  }

  move(direction) {
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
        this.anims.play('bottom', true); // Проверьте название анимации
        break;
      case 'down':
        this.body.setVelocityY(this.playerVelocity);
        this.anims.play('top', true); // Проверьте название анимации
        break;
    }
  }

  moveDiagonal(horizontal, vertical) {
    this.move(horizontal);
    this.move(vertical);
  }

  // update(cursors) {
  //   // Управление игроком с помощью стрелок
  //   if (cursors.left.isDown) {
  //     this.body.setVelocityX(-this.playerVelocity);
  //     this.direction = 'left';
  //     this.anims.play('left', true);

  //   } else if (cursors.right.isDown) {
  //     this.body.setVelocityX(this.playerVelocity);
  //     this.direction = 'right';
  //     this.play('right', true);

  //   } else if (cursors.down.isDown) {
  //     this.body.setVelocityY(this.playerVelocity)
  //     this.direction = 'top';
  //     this.play('top', true);

  //   } else if (cursors.up.isDown) {
  //     this.body.setVelocityY(-this.playerVelocity);
  //     this.direction = 'bottom';
  //     this.play('bottom', true);

  //   } else {
  //     this.body.setVelocityX(0);
  //     this.body.setVelocityY(0);
  //     this.anims.stop();

  //     switch (this.direction) {
  //       case 'left':
  //         break;

  //       default: break;
  //     }
  //   }

  //   if (cursors.up.isDown && cursors.left.isDown) {
  //     this.body.setVelocityX(-this.playerVelocity);
  //     this.body.setVelocityY(-this.playerVelocity);
  //     this.direction = 'top';
  //     this.anims.play('top', true);
  //   } else if (cursors.down.isDown && cursors.left.isDown) {
  //     this.body.setVelocityX(-this.playerVelocity);
  //     this.body.setVelocityY(this.playerVelocity);
  //     this.direction = 'bottom';
  //     this.anims.play('bottom', true);
  //   } else if (cursors.up.isDown && cursors.right.isDown) {
  //     this.body.setVelocityX(this.playerVelocity);
  //     this.body.setVelocityY(this.playerVelocity);
  //     this.direction = 'top';
  //     this.anims.play('top', true);
  //   } else if (cursors.down.isDown && cursors.right.isDown) {
  //     this.body.setVelocityX(this.playerVelocity);
  //     this.body.setVelocityY(this.playerVelocity);
  //     this.direction = 'top';
  //     this.anims.play('top', true);
  //   }

  //   this.body.velocity.normalize().scale(this.playerVelocity);
  // }
}