//TODO
import { Bullet } from "./bullet.js";
import { Renderer } from "./renderer.js";
export class Tank {
  constructor(y, x, direction) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.direction = direction;
    this.body = Renderer(
      this.size,
      this.size,
      y * this.size,
      x * this.size,
      "tank"
    );
    this.movingInterval = null;
    this.body.anchor.set(0.5, 0.5);
  }

  // TODO
  // **
  // shoot = (y, x, direction) => {
  //   let bullet = new Bullet(y, x, direction);
  // };
  fire = () => {
    let bullet = new Bullet(this.y, this.x, this.direction);
    return bullet;
    // this.fireInterval = setInterval(function () {
    //   bullet.move();
    // }, 1000);
    // console.log(bullet);
  };
  // destroy();
  // let check = 0;

  move = (direction) => {
    // check
    let arc = Math.PI / 2;
    let dirs = [];
    for (let i = 0; i < 4; i++) {
      dirs.push(arc * i);
    }
    let self = this;
    this.movingInterval = setInterval(function () {
      // console.log(this);
      let dirX = [0, 0.1, 0, -0.1], // up right down left
        dirY = [-0.1, 0, 0.1, 0];
      // this.x
      self.y += dirY[direction];
      self.x += dirX[direction];
      // console.log(arc);
      // console.log(dirs);
      self.body.rotation += dirs[direction] - dirs[self.direction];
      if ((direction - self.direction + 4) % 2 == 1) {
        console.log("here", self.x);
        // console.log(self.x, self.x | 2);
        self.x = (self.x * 2 + 0.5) | 0.5;
        self.y = (self.y * 2 + 0.5) | 0.5;
        self.y /= 2;
        self.x /= 2;
        // console.log(self.x);
      }
      self.body.x = self.x * self.size;
      self.body.y = self.y * self.size;
      self.direction = direction;
    }, 20);
  };
  stop = () => {
    alert("open1");
    clearInterval(this.movingInterval);
  };
  // pickBoost(); // todo
  // **
}
