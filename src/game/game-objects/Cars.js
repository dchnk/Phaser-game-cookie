export default class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, side) {
        super(scene, x, y, texture);

        this.scene = scene;

        // время жизни в миллисекундах
        this.lifetime = 15000;

        this.side = side;

        // отслеживаем время исчезновения
        this.fadeTime = this.lifetime - 5000;

        // Заносим анимацию в переменную для возможности ее остановить
        this.fadeOutAnimation = null;

        // Флаг завершения анимации
        this.animateIsDone = false;

        // Задаём начальные параметры физики
        //   scene.physics.world.enable(this);
        scene.add.existing(this);

        // Меняем коллизию на круг с минимальным радиусом для правильной аниации появления
        // this.body.setCircle(1, 0, 0);
        // console.log(this.body)

        // Запуск анимации появления
        this.show();

        // Таймер отсчета времени жизни и исчезновения
        // this.startLifeTimer();
    }

    // Показывает анимацию появления
    show() {
        this.setAlpha(0);
        this.setScale(.6, .7)
        this.y = this.y - this.height;
        switch (this.side) {
            case 'top':
                this.y = this.y - 300;
                break;


            default: break;

        }

        this.scene.tweens.add({
            targets: this,
            alpha: 1, // Непрозрачность
            duration: 800, // Задаём длительность появления
            y:  '+=200',
            onComplete: () => {
                this.setAlpha(1);

                // Добовляем столкновения между печеньками
                // this.scene.physics.add.collider(this.scene.cookies, this.scene.cookies);

                // this.bounce()

            }
        });
    }

    bounce() {
        this.scene.tweens.add({
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