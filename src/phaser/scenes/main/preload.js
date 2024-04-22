export function preload() {
  this.load.image('map', '../src/img/map.png');
  this.load.image('cookie', '../src/img/1.png');
  this.load.spritesheet('cook',
    '../src/img/cook-sprite-full.png',
    { frameWidth: 60, frameHeight: 90 }
  );
}