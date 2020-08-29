import { Renderer } from './renderer.js';
export class Brick {
  constructor(y, x) {
    this.size = 16;
    this.y = y;
    this.x = x;
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      'brick'
    );
  }
}
