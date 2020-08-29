//TODO
import { Bullet } from './bullet.js';
import { Renderer } from './renderer.js';
export class Tank {
  constructor(y, x, direction, map) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.direction = direction;
    // tank asset detail : tank_{direction}_{animation}_{lvl}
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      'tank'
    );
    // map.addTank(y - 0.5, x - 0.5);
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
  check = (y, x, map) => {
    y *= 2;
    x *= 2;
    console.log(y, x);
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        let Y = y + i;
        let X = x + j;
        if (Y >= map.map.length || Y < 0 || X >= map.map[Y].length || X < 0)
          return false;
        if (map.map[Y][X] != 0 && map.map[Y][X] != 3) {
          return false;
        }
      }
    }
    return true;
  };
  move = (direction, map) => {
    // check
    let arc = Math.PI / 2;
    let dirs = [];
    for (let i = 0; i < 4; i++) {
      dirs.push(arc * i);
    }
    let self = this;
    self.body.rotation += dirs[direction] - dirs[self.direction];
    let pastDirection = self.direction;
    this.direction = direction;
    // up right down left
    let dirX = [0, 0.1, 0, -0.1],
      dirY = [-0.1, 0, 0.1, 0],
      curY = Math.floor(self.y * 2) / 2,
      curX = Math.floor(self.x * 2) / 2,
      nextY = self.y + dirY[direction],
      nextX = self.x + dirX[direction];

    nextY = Math.floor(nextY * 2) / 2;
    // nextX = nextX - (nextX % 0.5);
    nextX = Math.floor(nextX * 2) / 2;

    if (nextY != curY || nextX != curX) {
      // add moveCheck here
      // map.removeTank(curY - 0.5, curX - 0.5);
      // map.addTank(nextY - 0.5, nextX - 0.5);
    }
    self.y += dirY[direction];
    self.x += dirX[direction];
    curY = Math.floor(self.y * 2) / 2;
    curX = Math.floor(self.x * 2) / 2;
    if ((direction - pastDirection + 4) % 2 == 1) {
      self.x = (self.x * 2 + 0.5) | 0.5;
      self.y = (self.y * 2 + 0.5) | 0.5;
      self.y /= 2;
      self.x /= 2;
    }
    self.body.x = self.x * self.size;
    self.body.y = self.y * self.size;
  };
}
