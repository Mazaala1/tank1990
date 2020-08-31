import { Renderer } from './renderer.js';
export class Steel {
  constructor(y, x) {
    this.size = 16;
    this.team = 0;
    this.y = y;
    this.x = x;

    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      'steel'
    );
  }
}
