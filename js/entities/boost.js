//TODO
import { Renderer } from "./renderer.js";
import { Explosion } from "./explosion.js";
export class Boost {
  constructor(x, y) {
    console.log("new boost generated at", x, y);
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

export function useBoost(item, user, bots, stage, gameBoard, map) {
  let types = ["grenade", "helmet", "shovel", "star", "tank", "timer"];
  console.log("boost");
  if (item.type == "grenade") {
    console.log("grenaaade");
    while (bots.length != 0) {
      let bot = bots[bots.length - 1];
      gameBoard.removeChild(bot.body);
      let explosion = new Explosion(bot.y, bot.x, "big");
      gameBoard.addChild(explosion);
      setTimeout(() => {
        gameBoard.removeChild(explosion);
      }, 500);
      bots.pop();
    }
  }
  if (item.type == "helmet") {
    // to do
    user.helmet += 10000;
  }
  if (item.type == "shovel") {
    let positions = [
      { x: 11, y: 23 },
      { x: 12, y: 23 },
      { x: 13, y: 23 },
      { x: 14, y: 23 },
      { x: 11, y: 24 },
      { x: 11, y: 25 },
      { x: 14, y: 24 },
      { x: 14, y: 25 },
    ];
    positions.forEach((pos) => {
      map.map[pos.y][pos.x] = 2;
    });
    map.renderer();
    setTimeout(() => {
      positions.forEach((pos) => {
        if (map.map[pos.y][pos.x] > 0) map.map[pos.y][pos.x] = 1;
      });
      map.renderer();
    }, 10000);
  }
  if (item.type == "star") {
    console.log("staaar");
    user.lvl++;
    if (user.lvl % 2 == 0) user.leftBullet += 1;
    user.body.texture = PIXI.Texture.from(
      "assets/" +
        "tank" +
        "_" +
        user.direction +
        "_" +
        user.animation +
        "_" +
        user.lvl +
        ".png"
    );
  }
  if (item.type == "timer") {
    return true;
  }
  if (item.type == "tank") {
    user.life++;
  }
  return false;
}
