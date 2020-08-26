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
  }

  // TODO
  // **
  shoot = (y, x, direction) => {
    let bullet = new Bullet(y, x, direction);
  };
  // destroy();
  // let check = 0;

  move = (direction) => {
    // check
    let self = this;
    this.movingInterval = setInterval(function () {
      // console.log(this);
      let dirX = [0, 0.1, 0, -0.1], // up right down left
        dirY = [-0.1, 0, 0.1, 0];
      self.y += dirY[direction];
      self.x += dirX[direction];
      self.body.x = self.x * self.size;
      self.body.y = self.y * self.size;
    }, 50);
  };
  stop = () => {
    alert('open1');
    clearInterval(this.movingInterval);
  };
  // pickBoost(); // todo
  // **
}
