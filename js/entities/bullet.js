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

  collision = (stage) => {
    let answer = false;
    let bulX = this.body.x,
      bulY = this.body.y;
    // if (this.direction % 2 == 0) {
    //   bulX += 12;
    // } else {
    //   bulY += 12;
    //   bulX += 12;
    // }
    // console.log(bulX, bulY);
    stage.children.forEach(board => {
      // console.log(board);
      board.children.forEach(obstacle => {
        // console.log(obstacle.x, obstacle.y);
        //left right check
        // console.log(obstacle.size);
        // console.log(obstacle.width, obstacle.height);
        if (bulX + 8 >= obstacle.x && bulX <= obstacle.x + obstacle.width) {
          // top bottom check
          // console.log("ydaj x");
          if (bulY + 8 >= obstacle.y && bulY <= obstacle.y + obstacle.height) {
            // console.log("onoson");
            answer = true;
            board.removeChild(obstacle);
          }
        }
      });
    });

    return answer;
  }
}
