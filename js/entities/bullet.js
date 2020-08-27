import { Renderer } from './renderer.js';
export class Bullet {
  constructor(y, x, direction) {
    this.size = 8;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.body = Renderer(this.size, this.size, y * 32, x * 32, 'bullet');
    this.body.anchor.set(0.5, 0.5);
    let arc = Math.PI / 2;
    this.body.rotation += arc * direction;
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

// a = Bullet(this.y, this.x, direction);
// a.move;
