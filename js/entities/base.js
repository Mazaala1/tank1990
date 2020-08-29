//TODO
import { Renderer } from './renderer.js';
export class Base {
  constructor(y, x) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.body = Renderer(this.size, this.size, y * 16, x * 16, 'base');
  }
}
