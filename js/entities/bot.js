import { Bullet } from "./bullet.js";
import { Renderer } from "./renderer.js";

let speed = [];
let type = ["fast_", "armor_", "basic_"];

export class Bot {
  constructor(y, x, direction, speed) {
    this.speed = speed;
    this.size = 32;
    this.y = y;
    this.x = x;
    this.lvl = 0; //
    this.red = Math.floor(Math.floor(Math.random() * 4) / 3);
    console.log(this.red, "red");
    this.team = 2;
    this.animation = 0; //
    this.bulletmax = 1;
    this.leftBullet = 1;
    this.rotate_freeze = 0;
    this.types = ["basic", "armor", "fast"];
    this.type = Math.floor(Math.random());
    this.direction = direction;
    this.hp = 1;
    this.type = Math.floor(Math.random() * 3);
    if (this.type == 0) {
      this.speed = 1;
    }
    if (this.type == 1) {
      this.hp = 2;
    }
    console.log(this.type, "type");
    // this.spawned = 2;
    // tank asset detail : enemy_{type}_{direction}_{animation}_{lvl}_{red : 1 , not : 0}

    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      "enemy_" +
        type[this.type] +
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
  fire = (num) => {
    if (this.leftBullet <= 0) return null;
    let bullet = new Bullet(this.y, this.x, this.direction, 2, 1, this, num);
    this.leftBullet--;
    return bullet;
  };
  rotation = (direction) => {
    let rotate;
    let smart_move = Math.floor(Math.random() * 4);
    // console.log(smart_move, "random");
    rotate = Math.floor(Math.random() * 4);
    if (smart_move > 0 && direction != 2) {
      // console.log("here");
      rotate = 2;
    }
    if ((rotate - this.direction + 4) % 2 == 1) {
      this.x = (this.x * 2 + 0.5) | 0.5;
      this.y = (this.y * 2 + 0.5) | 0.5;
      this.y /= 2;
      this.x /= 2;
      this.body.x = this.x * this.size;
      this.body.y = this.y * this.size;
    }
    this.direction = rotate;
    // console.log(this.direction, "curretn direction");
    this.body.texture = PIXI.Texture.from(
      "assets/" +
        "enemy_" +
        type[this.type] +
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

  move = (map, players, bots) => {
    let dirX = [0, 0.1, 0, -0.1],
      dirY = [-0.1, 0, 0.1, 0];
    let answer = false;
    let bulX = (this.x + dirX[this.direction]) * this.size;
    let bulY = (this.y + dirY[this.direction]) * this.size;

    if (
      bulX + this.size > 13 * 32 ||
      bulX < 0 ||
      bulY + this.size > 13 * 32 ||
      bulY < 0
    )
      answer = true;
    players.forEach((player) => {
      if (
        bulX + 32 > Math.round(player.body.x) &&
        bulX < Math.round(player.body.x) + player.body.width
      ) {
        if (
          bulY + 32 > Math.round(player.body.y) &&
          bulY < Math.round(player.body.y) + player.body.height
        ) {
          for (let i = 0; i < bots.length; i++) {
            answer = true;
          }
        }
      }
    });

    if (answer || map.wall(this.direction, map, this.y, this.x)) {
      // rotate freeze;
      if (this.rotate_freeze == 0) {
        this.rotation(this.direction);
        this.rotate_freeze = 10;
      } else {
        this.rotate_freeze--;
      }
    } else {
      let rotate = Math.floor(Math.random() * 10);
      if (rotate <= 1) {
        if (this.rotate_freeze == 0) {
          this.rotation(1);
          // console.log(this.x, this.y);
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
