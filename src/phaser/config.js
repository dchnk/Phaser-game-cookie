import main from './scenes/main/main';

export let config = {
  width: '1000',
  height: '1000',
  title: 'Phaser Cookie Game',
  type: Phaser.AUTO,
  parent: document.querySelector('.main'),
  scene: [main, ],
  physics: {
    default: 'arcade',
  },
}