//TODO
import { Bullet } from './bullet.js';
import { Renderer } from './renderer.js';
export class Tank {
  constructor(y, x, direction) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      'tank'
    );
    this.movingInterval = null;
    this.body.anchor.set(0.5, 0.5);
  }

  // TODO
  // **
  // destroy();
  // pickBoost();
  // **
  fire = () => {
    let bullet = new Bullet(this.y, this.x, this.direction);
    return bullet;
  };

  move = (direction) => {
    // check
    let arc = Math.PI / 2;
    let dirs = [];
    for (let i = 0; i < 4; i++) {
      dirs.push(arc * i);
    }
    let self = this;
    // up right down left
    let dirX = [0, 0.1, 0, -0.1],
      dirY = [-0.1, 0, 0.1, 0];
    self.y += dirY[direction];
    self.x += dirX[direction];
    self.body.rotation += dirs[direction] - dirs[self.direction];
    if ((direction - self.direction + 4) % 2 == 1) {
      self.x = (self.x * 2 + 0.5) | 0.5;
      self.y = (self.y * 2 + 0.5) | 0.5;
      self.y /= 2;
      self.x /= 2;
    }
    self.body.x = self.x * self.size;
    self.body.y = self.y * self.size;
    self.direction = direction;
  };
}
