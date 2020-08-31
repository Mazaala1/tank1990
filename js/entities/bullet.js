import { Renderer } from './renderer.js';
export class Bullet {
  constructor(y, x, direction) {
    this.size = 8;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.margin = (32 - this.size) / 2;
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
    // console.log(map.map);
    let answer = false;
    let bulX = this.body.x,
      bulY = this.body.y;
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
          }
        }
      });
    });

    return answer;
  };
}
