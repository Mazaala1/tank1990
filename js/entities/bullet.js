import { Renderer } from './renderer.js';
export class Bullet {
  constructor(y, x, direction) {
    this.size = 8;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.margin = 32 - this.size;
    this.body = Renderer(
      this.size,
      this.size,
      y * 32,
      x * 32,
      'bullet' + direction
    );
  }
  move = () => {
    let dirX = [0, 0.25, 0, -0.25],
      dirY = [-0.25, 0, 0.25, 0];
    this.y += dirY[this.direction];
    this.x += dirX[this.direction];
    this.body.x = this.x * 32;
    this.body.y = this.y * 32;
  };
}
