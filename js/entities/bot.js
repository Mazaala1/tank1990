import { Renderer } from "./renderer.js";

let type = ["fast", "armor", "basic"];
let speed = [];
export class Bot {
  constructor(y, x, direction, shape) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      "tank_fast"
    );

    this.movingInterval = null;
  }
  move = () => {
    this.y += 0.05;
    // this.
    this.body.y = this.y * this.size;
  };
}
