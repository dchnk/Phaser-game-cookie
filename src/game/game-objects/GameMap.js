export default class GameMap {
  constructor(scene, key) {
    this.scene = scene;
    this.key = key;

    this.x = 0;
    this.y = 0;
    this.height = 1200;
    this.width = 1200;

    this.mapImage = scene.add.image(this.x, this.y, key).setOrigin(0, 0);
    
    this.wallsCollisions = {
      startX: 265,
      endX: 930,
      startY: 265,
      endY: 935
    }
    
    this.cookiesArea = {
      startX: 300,
      endX: 900,
      startY: 190,
      endY: 800
    }
    
    this.walls = this.createWalls();

  }

  createWalls() {
    const walls = this.scene.physics.add.staticGroup();

    // Создание верхней стены
    walls.create(this.width / 2, this.wallsCollisions.startY, 'platform').setScale(22, .5).refreshBody().setVisible(false);

    // Создание нижней стены
    walls.create(this.width / 2, this.wallsCollisions.endY, 'platform').setScale(22, .5).refreshBody().setVisible(false);

    // Создание левой стены
    walls.create(this.wallsCollisions.startX, this.height / 2, 'platform').setScale(.5, 22).refreshBody().setVisible(false);

    // Создание правой стены
    walls.create(this.wallsCollisions.endX, this.height / 2, 'platform').setScale(.5, 22).refreshBody().setVisible(false);

    return walls;
  }
}