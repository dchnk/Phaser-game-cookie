import MainScene from './scenes/mainScene';

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

if (windowHeight < windowWidth) windowWidth = windowHeight;

if (windowHeight > windowWidth && window.innerWidth > 1200) windowHeight = windowWidth;


export let config = {
  type: Phaser.AUTO,  
  height: windowHeight,
  width: windowWidth,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: document.querySelector('.main'),
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }

  },
}