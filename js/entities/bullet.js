import { Renderer } from './renderer.js';
export class Bullet {
  constructor(y, x, direction, team, lvl, owner) {
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

  collision = (stage, map) => {
    let answer = false;
    let bulX = this.body.x,
      bulY = this.body.y;
    if (bulY <= 0 || bulX <= 0 || bulY >= 13 * 31 || bulX >= 13 * 31)
      return true;
    stage.children.forEach((board) => {
      board.children.forEach((obstacle) => {
        if (bulX + 8 >= obstacle.x && bulX <= obstacle.x + obstacle.width) {
          if (bulY + 8 >= obstacle.y && bulY <= obstacle.y + obstacle.height) {
            if (obstacle.texture == PIXI.Texture.from('assets/brick.png')) {
              answer = true;
              let y = obstacle.y / 16,
                x = obstacle.x / 16;
              map.map[y][x] = 0;
              board.removeChild(obstacle);
            }
            if (obstacle.texture == PIXI.Texture.from('assets/steel.png')) {
              answer = true;
              if (this.lvl > 2) {
                let y = obstacle.y / 16,
                  x = obstacle.x / 16;
                map.map[y][x] = 0;
                board.removeChild(obstacle);
              }
            }
          }
        }
      });
    });

    return answer;
  };
}
