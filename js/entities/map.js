import { Brick } from './brick.js';
import { Base } from './base.js';
import { Steel } from './steel.js';
/*
 0: empty road
 1: brick
 2: steel block
 3: player
 5: eagle
*/
let map = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [ 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,],
  [ 2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
];

export class Map {
  constructor() {
    this.body = new PIXI.Container();
    this.map = map;
    let first = true;
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == 1) {
          let brk = new Brick(i, j);
          this.body.addChild(brk.body);
        }
        if (map[i][j] == 2) {
          let stl = new Steel(i, j);
          this.body.addChild(stl.body);
        }
        if (map[i][j] == 5 && first) {
          let base = new Base(i, j);
          this.body.addChild(base.body);
          first = false;
        }
      }
    }
  }
  addTank = (y, x) => {
    y *= 2;
    x *= 2;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.map[y + i][x + j] = 3;
      }
    }
  };
  removeTank = (y, x) => {
    y *= 2;
    x *= 2;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.map[y + i][x + j] = 0;
      }
    }
  };

  wall = (direction, map, y, x) => {
    let dirX = [0, 0.1, 0, -0.1],
      dirY = [-0.1, 0, 0.1, 0];

    let tmpx = Math.round((x) * 10) / 10, tmpy = Math.round((y) * 10) / 10;
    if (direction == 1 || direction == 3) {
      if (tmpx % 0.5 == 0) 
        return map.checkCollision(Math.round((tmpy + dirY[direction] * 5) * 2), Math.round((tmpx + dirX[direction] * 5) * 2));
      return false;
    }
    
    if (tmpy % 0.5 == 0) 
      return map.checkCollision(Math.round((tmpy + dirY[direction] * 5) * 2), Math.round((tmpx + dirX[direction] * 5) * 2));
    
    return false;    
  }

  checkCollision = (y, x) => {
    if ((y < 0 || y + 1 >= this.map.length) || (x < 0 || x + 1 >= this.map[0].length))
      return true;
    if (this.map[y][x] == 0 && this.map[y + 1][x] == 0 && this.map[y][x + 1] == 0 && this.map[y + 1][x + 1] == 0)
      return false;
    return true;
  }
}
