export default class GameMap {
  constructor(scene, key) {
    this.scene = scene;
    console.log(this)
    this.key = key;
    this.x = 0;
    this.y = 0;
    this.mapImage = scene.add.image(this.x, this.y, key).setOrigin(0, 0);
    this.setXY(this.mapImage.width / 2, this.mapImage.height / 2)
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