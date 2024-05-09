export default class Cookie extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;
    // время жизни в миллисекундах
    this.lifetime = 15000;
    // отслеживаем время исчезновения
    this.fadeTime = this.lifetime - 5000;

    this.fadeOutAnimation = null;

    // Флаг завершения анимации
    this.animateIsDone = false;

    // Задаём начальные параметры физики
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.body.setCircle(1, 0, 0);
    // Запуск анимации появления
    this.show();

    // Таймер отсчета времени жизни и исчезновения
    // this.startLifeTimer();


  }

  // Показывает анимацию появления
  show() {
    this.setAlpha(0);
    this.setScale(2);
    this.scene.tweens.add({
      targets: this,
      y: `+=100`, // Эффект падения
      alpha: 1, // Непрозрачность
      duration: 400, // Задаём длительность появления
      scale: .18,

      onComplete: () => {
        this.setScale(.2)
        this.body.setCircle(100, 0, 0);
        this.body.setBounce(1, 1)
        this.body.setDrag(50, 50)
        // this.body.setVelocity(0, -20)
        this.body.setMass(1);
       

        this.bounce()
        this.setAlpha(1); // Установить непрозрачность после завершения анимации.        
      }
    });
  }



  bounce() {
    this.scene.tweens.add({
      y: `+=15`,
      scale: .2,
      targets: this,
      duration: 600,
      ease: 'Bounce.easeOut',

      onComplete: () => {
        this.animateIsDone = true;
      }
    })
  }

  // Начинаем таймер исчезновения печеньки
  startLifeTimer() {
    this.scene.time.delayedCall(this.fadeTime, () => {
      this.fadeOut();
    });
  }

  // Исчезновение печеньки


  fadeOut() {
    // if (!this.scene) return;

    this.fadeOutAnimation = this.scene.tweens.add({
      targets: this,
      alpha: 0.3,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 2,
      onComplete: () => { this.fadeAway() },
    });
  }

  fadeAway() {
    // if (!this.scene) return;

    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 1000,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.destroy();
      }
    });
  }

  stopFadeOut() {
    if (this.fadeOutAnimation && this.fadeOutAnimation.isPlaying()) {
      this.fadeOutAnimation.stop(); // Останавливаем анимацию исчезновения

      // Возвращаем прозрачность к первоначальному состоянию если нужно
      this.setAlpha(1);
    }
  }

  // Вызывается при сборе печеньки персонажем
  collect() {
    if (this.animateIsDone) this.destroy();
  }
}