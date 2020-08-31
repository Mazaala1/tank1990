import { Bullet } from "./bullet.js";
import { Renderer } from "./renderer.js";

let speed = [];
let type = ["fast", "armor", "basic"];

export class Bot {
  constructor(y, x, direction) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.lvl = 0; //
    this.red = 0;
    this.animation = 0; //
    this.leftBullet = 1;
    this.rotate_freeze = 0;
    this.direction = direction;
    // this.spawned = 2;
    // tank asset detail : enemy_{direction}_{animation}_{lvl}_{red : 1 , not : 0}

    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      "enemy_" +
        "basic_" +
        direction +
        "_" +
        this.animation +
        "_" +
        this.lvl +
        "_" +
        this.red
    );

    this.movingInterval = null;
  }
  fire = () => {
    if (this.leftBullet <= 0) return null;
    let bullet = new Bullet(this.y, this.x, this.direction, 2, 1, this);
    this.leftBullet--;
    return bullet;
  };
  rotation = (map) => {
    let rotate = Math.floor(Math.random() * 4);
    let mat = map.map;
    console.log(mat, this.y, this.x);
    if ((rotate - this.direction + 4) % 2 == 1) {
      this.x = (this.x * 2 + 0.5) | 0.5;
      this.y = (this.y * 2 + 0.5) | 0.5;
      this.y /= 2;
      this.x /= 2;
      this.body.x = this.x * this.size;
      this.body.y = this.y * this.size;
    }
    this.direction = rotate;
    this.body.texture = PIXI.Texture.from(
      "assets/" +
        "enemy_" +
        "basic_" +
        this.direction +
        "_" +
        this.animation +
        "_" +
        this.lvl +
        "_" +
        this.red +
        ".png"
    );
  };

  move = (map) => {
    if (map.wall(this.direction, map, this.y, this.x)) {
      // rotate freeze;
      if (this.rotate_freeze == 0) {
        this.rotation(map);
        this.rotate_freeze = 10;
      } else {
        this.rotate_freeze--;
      }
    } else {
      let rotate = Math.floor(Math.random() * 10);
      if (rotate <= 1) {
        if (this.rotate_freeze == 0) {
          this.rotation(map);
          console.log(this.x, this.y);
          this.rotate_freeze = 10;
        } else {
          this.rotate_freeze--;
        }
      }
      if (map.wall(this.direction, map, this.y, this.x)) {
        return;
      }

      let dirX = [0, 0.1, 0, -0.1],
        dirY = [-0.1, 0, 0.1, 0];
      this.y += dirY[this.direction];
      this.x += dirX[this.direction];
      this.body.x = this.x * this.size;
      this.body.y = this.y * this.size;
    }
  };
}
