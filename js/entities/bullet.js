import { Explosion } from "./explosion.js";
import { Renderer } from "./renderer.js";
import { Boost } from "./boost.js";
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
      "bullet" + direction
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

  collision = (
    stage,
    map,
    bots,
    players,
    bullets,
    gameBoard,
    boosters,
    shields
  ) => {
    let answer = [false, new Array(), false, false];
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
            if (obstacle.texture == PIXI.Texture.from("assets/base.png")) {
              answer[2] = true;
            }
            if (obstacle.texture == PIXI.Texture.from("assets/brick.png")) {
              answer[0] = true;
              let y = obstacle.y / 16,
                x = obstacle.x / 16;
              map.map[y][x] = 0;
              board.removeChild(obstacle);
              i--;
            }
            if (obstacle.texture == PIXI.Texture.from("assets/steel.png")) {
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
                  if (bots[j].red == 1) {
                    // generateBoost();
                    console.log("red killed");
                    let boost = new Boost(
                      Math.floor(Math.random() * 12),
                      Math.floor(Math.random() * 12)
                    );
                    gameBoard.addChild(boost.body);
                    boosters.push(boost);
                  }
                  let temp = bots[j];
                  bots[j] = bots[bots.length - 1];
                  bots[bots.length - 1] = temp;
                  bots.pop();
                  j--;
                  board.removeChild(obstacle);
                  let explosion = new Explosion(
                    obstacle.y / 32,
                    obstacle.x / 32,
                    "big"
                  );
                  gameBoard.addChild(explosion);
                  setTimeout(() => {
                    gameBoard.removeChild(explosion);
                  }, 500);
                  i--;
                  //call
                  answer[3] = true;
                  answer[0] = true;
                }
              }
            }

            if (this.team == 2) {
              let y = [12, 12];
              let x = [4, 8];
              for (let i = 0; i < players.length; i++) {
                // players.forEach((player) => {
                if (obstacle === players[i].body) {
                  if (players[i].helmet == 0) {
                    if (players[i].lvl > 0) {
                      players[i].lvl--;
                      players[i].body.texture = PIXI.Texture.from(
                        "assets/" +
                          "tank" +
                          "_" +
                          players[i].direction +
                          "_" +
                          players[i].animation +
                          "_" +
                          players[i].lvl +
                          ".png"
                      );
                    } else {
                      players[i].life--;
                      if (players[i].life > 0) {
                        players[i].x = x[i];
                        players[i].y = y[i];
                        players[i].body.x = players[i].x * 32;
                        players[i].body.y = players[i].y * 32;
                        shields[i].x = players[i].body.x;
                        shields[i].y = players[i].body.y;
                        players[i].helmet = true;
                        setTimeout(() => {
                          players[i].helmet = false;
                        }, 10000);
                      } else {
                        board.removeChild(obstacle);
                        players[i].leftBullet = -1;
                        console.log(players, players.length);
                      }
                      // console.log('player', i, players[i].x, players[i].y);
                      // alert('gege');
                      answer[3] = true;
                    }
                  }
                  answer[0] = true;
                }
              }
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
