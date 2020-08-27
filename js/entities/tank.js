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
    self.body.rotation += dirs[direction] - dirs[self.direction];
    // up right down left
    let dirX = [0, 0.1, 0, -0.1],
      dirY = [-0.1, 0, 0.1, 0],
      pastY = self.y - (self.y % 0.5),
      pastX = self.x - (self.x % 0.5),
      curY,
      curX;
    self.y += dirY[direction];
    self.x += dirX[direction];

    curY = self.y - (self.y % 0.5);
    curX = self.x - (self.x % 0.5);

    if (pastY != curY || pastX != curX) {
      // update
      console.log(pastY - 0.5, pastX - 0.5, '-->', curY - 0.5, curX - 0.5);
      // deleteTankFromData()
    }
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
