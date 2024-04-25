import MainScene from './scenes/mainScene';

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;


windowHeight = windowHeight > 1000 ? 1000 : windowHeight;
windowWidth = windowWidth > 1000 ? 1000 : windowWidth;


console.log(windowWidth)
export let config = {
  type: Phaser.AUTO,
  // height: windowHeight.toString(),
  // width: windowWidth.toString(),
  scale: {
    mode: Phaser.Scale.FIT, // Будет масштабировать игровую область для заполнения всего экрана
    width: windowWidth.toString(),
    height: '100%',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    
  },
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  parent: document.querySelector('.main'),
  scene: [MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
    
  },
}