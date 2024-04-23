export default class GameMap {
  constructor(scene, key) {
    this.scene = scene;
    this.key = key;
    this.x = scene.cameras.main.centerX;
    this.y = scene.cameras.main.centerY;
    this.mapImage = scene.add.image(this.x, this.y, key);
    this.walls = {};
  }

  setXY(x, y) {
    if (x) {
      this.x = x;
    }

    if (y) {
      this.y = y;
    }
  }
}

class Walls {
  constructor(scene, x, y) {
    
  }
}