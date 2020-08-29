import { Bullet } from './bullet.js';
import { Renderer } from './renderer.js';
export class Tank {
  constructor(y, x, direction, map) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.lvl = 0;
    this.animation = 0;
    this.changeAnimation = false;
    // tank asset detail : tank_{direction}_{animation}_{lvl}
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      'tank' + '_' + this.direction + '_' + this.animation + '_' + this.lvl
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
    let pastDirection = this.direction;
    this.direction = direction;
    this.body.texture = PIXI.Texture.from(
      'assets/' +
        'tank' +
        '_' +
        this.direction +
        '_' +
        this.animation +
        '_' +
        this.lvl +
        '.png'
    );
    // up right down left
    let dirX = [0, 0.1, 0, -0.1],
      dirY = [-0.1, 0, 0.1, 0],
      curY = Math.floor(this.y * 2) / 2,
      curX = Math.floor(this.x * 2) / 2,
      nextY = this.y + dirY[direction],
      nextX = this.x + dirX[direction];

    nextY = Math.floor(nextY * 2) / 2;
    nextX = Math.floor(nextX * 2) / 2;

    curY = Math.floor(self.y * 2) / 2;
    curX = Math.floor(self.x * 2) / 2;
    if ((direction - pastDirection + 4) % 2 == 1) {
      this.x = (this.x * 2 + 0.5) | 0.5;
      this.y = (this.y * 2 + 0.5) | 0.5;
      this.y /= 2;
      this.x /= 2;
    }
    if (this.changeAnimation) {
      this.animation = (this.animation + 1) % 2;
      this.body.texture = PIXI.Texture.from(
        'assets/' +
          'tank' +
          '_' +
          this.direction +
          '_' +
          this.animation +
          '_' +
          this.lvl +
          '.png'
      );
      this.changeAnimation = false;
    } else {
      this.changeAnimation = true;
    }
    if (map.wall(direction, map, this.y, this.x))
      return;
    this.y += dirY[direction];
    this.x += dirX[direction];
    if (nextY != curY || nextX != curX) {
      // add moveCheck here
      // map.removeTank(curY - 0.5, curX - 0.5);
      // map.addTank(nextY - 0.5, nextX - 0.5);
    }
    // this.x = Math.floor(this.x * 10) / 10;
    // this.y = Math.floor(this.y * 10) / 10;
    this.body.x = this.x * this.size;
    this.body.y = this.y * this.size;
    // console.log(this.x, this.y);
  };
}
