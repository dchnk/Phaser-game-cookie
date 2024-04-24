import MainScene from './scenes/mainScene';

let height = window.innerHeight.toString();
let width = window.innerWidth.toString();

export let config = {
  type: Phaser.AUTO,
  height: '100%',
  width: '100%',
  scale: {
    mode: Phaser.Scale.FIT, // Чаще всего используется режим FIT
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: document.querySelector('.main'),
  scene: [MainScene],
  physics: {
    default: 'arcade',
  },
}