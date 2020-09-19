import { Bullet } from './bullet.js';
import { Renderer } from './renderer.js';
import { useBoost} from './boost.js';

const players = ['tank', 'tank1'];

export class Tank {
  constructor(y, x, direction, player_index) {
    this.y = y;
    this.x = x;
    this.lvl = 2;
    this.helmet = false;
    this.size = 32;
    this.team = 1;
    this.life = 2;
    this.shot = false;
    // this.shot = false;
    this.bulletmax = 1;
    this.leftBullet = 1;
    this.animation = 0;
    this.direction = direction;
    this.changeAnimation = false;
    // tank asset detail : tank_{direction}_{animation}_{lvl}
    console.log(
      players[player_index] +
        '_' +
        this.direction +
        '_' +
        this.animation +
        '_' +
        this.lvl
    );
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      players[player_index] +
        '_' +
        this.direction +
        '_' +
        this.animation +
        '_' +
        this.lvl
    );
  }
  // TODO
  // **
  // destroy();
  // pickBoost();
  // **
  fire = () => {
    if (this.leftBullet <= 0) return null;
    let bullet = new Bullet(this.y, this.x, this.direction, 1, this.lvl, this);
    this.leftBullet--;
    return bullet;
  };

  move = (stage, bots, direction, map, boosters, gameBoard) => {
    // console.log(Math.round(this.x), Math.round(this.y));

    let pastDirection = this.direction;
    let returnanswer = false;
    this.direction = direction;

    this.body.texture = PIXI.Texture.from(
      'assets/' +
        'tank' +
        '_' +
        this.direction +
        '_' +
        this.animation +
        '_' +
        this.lvl +
        '.png'
    );
    // up right down left
    let dirX = [0, 0.1, 0, -0.1],
      dirY = [-0.1, 0, 0.1, 0],
      nextY = this.y + dirY[direction],
      nextX = this.x + dirX[direction];

    nextY = Math.floor(nextY * 2) / 2;
    nextX = Math.floor(nextX * 2) / 2;

    if ((direction - pastDirection + 4) % 2 == 1) {
      this.x = (this.x * 2 + 0.5) | 0.5;
      this.y = (this.y * 2 + 0.5) | 0.5;
      this.y /= 2;
      this.x /= 2;
      this.body.x = this.x * this.size;
      this.body.y = this.y * this.size;
    }
    if (this.changeAnimation) {
      this.animation = (this.animation + 1) % 2;
      this.body.texture = PIXI.Texture.from(
        'assets/' +
          'tank' +
          '_' +
          this.direction +
          '_' +
          this.animation +
          '_' +
          this.lvl +
          '.png'
      );
      this.changeAnimation = false;
    } else {
      this.changeAnimation = true;
    }

    let answer = false;
    let bulX = (this.x + dirX[direction]) * this.size;
    let bulY = (this.y + dirY[direction]) * this.size;

    if (
      bulX + this.size > 13 * 32 ||
      bulX < 0 ||
      bulY + this.size > 13 * 32 ||
      bulY < 0
    )
      answer = true;
    bots.forEach((obstacle) => {
      if (
        bulX + 31 > obstacle.body.x &&
        bulX < obstacle.body.x + obstacle.body.width
      ) {
        if (
          bulY + 31 > obstacle.body.y &&
          bulY < obstacle.body.y + obstacle.body.height
        ) {
          answer = true;
        }
      }
    });
    for (let i = 0; i < boosters.length; i++) {
      let obstacle = boosters[i].body;
      if (bulX + 31 > obstacle.x && bulX < obstacle.x + obstacle.width) {
        if (bulY + 31 > obstacle.y && bulY < obstacle.y + obstacle.height) {
          if (useBoost(boosters[i], this, bots, stage, gameBoard, map)){
            returnanswer = true;
          }
          gameBoard.removeChild(obstacle);
          let tmp = boosters[i];
          boosters[i] = boosters[boosters.length - 1];
          boosters[boosters.length - 1] = tmp;
          boosters.pop();
          i--;
        } 
      }
    }
    
    if (answer || map.wall(direction, map, this.y, this.x)) return returnanswer;
    this.y += dirY[direction];
    this.x += dirX[direction];
    this.body.x = this.x * this.size;
    this.body.y = this.y * this.size;

    return returnanswer;
  };
}
