import { Renderer } from "./renderer.js";

let type = ["fast", "armor", "basic"];
let speed = [];
export class Bot {
  constructor(y, x, direction, type) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      "tank"
    );
    this.movingInterval = null;
    this.body.anchor.set(0.5, 0.5);
  }
}
