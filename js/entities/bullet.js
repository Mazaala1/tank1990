import { Renderer } from './renderer.js';
export class Bullet {
  constructor(y, x, direction, team, lvl, owner, num) {
    this.num = num;
    this.size = 8;
    this.y = y;
    this.x = x;
    this.lvl = lvl;
    this.team = team;
    this.direction = direction;
    this.margin = (32 - this.size) / 2;
    this.owner = owner;
    this.body = Renderer(
      this.size,
      this.size,
      y * 32 + this.margin,
      x * 32 + this.margin,
      'bullet' + direction
    );
  }
  move = () => {
    //up right down left
    let dirX = [0, 0.25, 0, -0.25],
      dirY = [-0.25, 0, 0.25, 0];
    this.y += dirY[this.direction];
    this.x += dirX[this.direction];
    this.body.x = this.x * 32 + this.margin;
    this.body.y = this.y * 32 + this.margin;
  };

  collision = (stage, map, bots, players, bullets) => {
    let answer = [false, new Array(), false];
    for (let i = 0; i < bullets.length; i++) {
      answer[1].push(false);
    }
    let bulX = this.body.x,
      bulY = this.body.y;
    if (bulY <= 0 || bulX <= 0 || bulY >= 13 * 31 || bulX >= 13 * 31)
      return [true, bullets];
    stage.children.forEach((board) => {
      for (let i = 0; i < board.children.length; i++) {
        let obstacle = board.children[i];
        if (bulX + 8 >= obstacle.x && bulX <= obstacle.x + obstacle.width) {
          if (bulY + 8 >= obstacle.y && bulY <= obstacle.y + obstacle.height) {
            if (obstacle.texture == PIXI.Texture.from('assets/base.png')) {
              answer[2] = true;
            }
            if (obstacle.texture == PIXI.Texture.from('assets/brick.png')) {
              answer[0] = true;
              let y = obstacle.y / 16,
                x = obstacle.x / 16;
              map.map[y][x] = 0;
              board.removeChild(obstacle);
              i--;
            }
            if (obstacle.texture == PIXI.Texture.from('assets/steel.png')) {
              answer[0] = true;
              if (this.lvl > 2) {
                i--;
                let y = obstacle.y / 16,
                  x = obstacle.x / 16;
                map.map[y][x] = 0;
                board.removeChild(obstacle);
              }
            }

            if (this.team == 1) {
              for (let j = 0; j < bots.length; j++) {
                if (bots[j].body === obstacle) {
                  let temp = bots[j];
                  bots[j] = bots[bots.length - 1];
                  bots[bots.length - 1] = temp;
                  bots.pop();
                  j--;
                  board.removeChild(obstacle);
                  i--;
                  answer[0] = true;
                }
              }
            }

            if (this.team == 2) {
              players.forEach((player) => {
                if (obstacle === player.body) {
                  // alert();
                  answer[0] = true;
                }
              });
            }

            for (let j = 0; j < bullets.length; j++) {
              if (
                obstacle === bullets[j].body &&
                bullets[j].team != this.team
              ) {
                bullets[j].owner.leftBullet++;
                if (bullets[j].owner.leftBullet > bullets[j].owner.bulletmax) {
                  bullets[j].owner.leftBullet = bullets[j].owner.bulletmax;
                }
                // answer[1][j] = true;
                let tmp = bullets[j];
                bullets[j] = bullets[bullets.length - 1];
                bullets[bullets.length - 1] = tmp;
                board.removeChild(obstacle);
                bullets.pop();
                j--;
                answer[0] = true;
                i--;
              }
            }
          }
        }
      }
    });

    return answer;
  };
}
