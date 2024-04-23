import MainScene from './scenes/mainScene';

export let config = {
  width: '100%',
  height: '100%',
  title: 'Phaser Cookie Game',
  type: Phaser.AUTO,
  parent: document.querySelector('.main'),
  scene: [MainScene],
  physics: {
    default: 'arcade',
  },
}