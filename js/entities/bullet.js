import { Renderer } from './renderer.js';
export class Bullet {
  constructor(y, x, direction) {
    this.size = 8;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.body = Renderer(
      this.size,
      this.size,
      (y + 0.5) * this.size,
      (x + 0.5) * this.size,
      'bullet'
    );
  }
  move = () => {
    let dirX = [0, 0.25, 0, -0.25],
      dirY = [0.25, 0, -0.25, 0];
    this.y += dirY[this.direction];
    this.x += dirX[this.direction];
    this.body.x = this.x * this.size;
    this.body.y = this.y * this.size;
  };
}

// a = Bullet(this.y, this.x, direction);
// a.move;
