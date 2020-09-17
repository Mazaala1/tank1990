//TODO
import { Renderer } from './renderer.js';
export class Boost {
  constructor(y, x) {
      this.types = ["grenade", "helmet", "shovel", "star", "tank", "timer"];
      this.typeSize = 6;
      this.size = 32;
      this.type = this.types[Math.floor(Math.random() * this.typeSize)];
      this.body = Renderer(
        this.size,
        this.size,
        y * this.size,
        x * this.size,
        "powerup_" + this.type 
      );
  }
}
