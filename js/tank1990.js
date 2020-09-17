import { Map } from './entities/map.js';
import { Bot } from './entities/bot.js';
import { Tank } from './entities/tank.js';
import { Spawn } from './entities/spawn.js';
import { Explosion } from './entities/explosion.js';

const cellSize = 32,
  width = 13,
  height = 13;
const app = new PIXI.Application({
  width: width * cellSize,
  height: height * cellSize,
  backgroundColor: 0x000000,
});
const gameBoard = new PIXI.Container();

let shot = false;
let map = new Map();
let player = new Tank(12, 4, 0, map);
console.log(player);

app.stage.addChild(map.body);
app.stage.addChild(gameBoard);
gameBoard.addChild(player.body);
document.body.appendChild(app.view);

var keyState = {};
window.addEventListener(
  'keydown',
  function (e) {
    if (e.keyCode != 32 && e.which != 32)
      for (let i = 37; i < 41; i++) keyState[i] = false;
    keyState[e.keyCode || e.which] = true;
  },
  true
);
window.addEventListener(
  'keyup',
  function (e) {
    keyState[e.keyCode || e.which] = false;
    if (e.keyCode == 32 || e.which == 32) shot = false;
  },
  true
);
let new_bot,
  cnt = 50,
  bots = [],
  choose = 0,
  bullets = [],
  botX = [6, 12, 0];
function playerMoveLoop() {
  //moves: left, up, right, down
  if (cnt == 70 && bots.length < 4) {
    let spawn = new Spawn(0, botX[choose]);
    gameBoard.addChild(spawn);
    setTimeout(() => {
      gameBoard.removeChild(spawn);
    }, 500);
  }
  if (cnt == 99 && bots.length < 4) {
    // let speed = Math.floor(Math.random() * 2);
    // speed++;
    // console.log(speed);
    new_bot = new Bot(0, botX[choose], 2, 2);
    bots.push(new_bot);
    gameBoard.addChild(new_bot.body);
    choose++;
    choose %= botX.length;
  }
  let num = 0;
  if (cnt % 10 == 0) {
    bots.forEach((bot) => {
      let shoot_check = Math.floor(Math.random() * 3);
      if (shoot_check == 1) {
        let bullet = bot.fire(num++);
        if (bullet != null) {
          bullets.push(bullet);
          gameBoard.addChild(bullet.body);
        }
      }
    });
  }
  // if (cnt % 2 == 0) {
  bots.forEach((bot) => {
    if (!bot.freeze) {
      // console.log(cnt, bot.speed);
      if (cnt % bot.speed == 0) {
        bot.move(map, player, bots);
      }
    } else {
      setTimeout(() => {
        bot.freeze = 0;
      }, 5000);
    }
  });
  // }
  if (keyState[37]) player.move(app.stage, bots, 3, map);
  else if (keyState[38]) player.move(app.stage, bots, 0, map);
  else if (keyState[39]) player.move(app.stage, bots, 1, map);
  else if (keyState[40]) player.move(app.stage, bots, 2, map);
  cnt++;
  cnt %= 100;
}

function BulletMoveLoop() {
  if (keyState[32] && !shot) {
    let bullet = player.fire();
    if (bullet != null) {
      shot = true;
      bullets.push(bullet);
      gameBoard.addChild(bullet.body);
    }
  }
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.move();
    let answer = bullet.collision(app.stage, map, bots, player, bullets);
    if (answer[0]) {
      let explosion = new Explosion(bullet.y, bullet.x, 'bullet');
      gameBoard.addChild(explosion);
      setTimeout(() => {
        gameBoard.removeChild(explosion);
      }, 500);
      gameBoard.removeChild(bullet.body);
      // console.log(bullet.owner, bullet.owner.leftBullet, 'to ');
      bullet.owner.leftBullet++; // ?????
      answer[1][i] = true;

      if (bullet.owner === player) {
        console.log(bullet.owner.leftBullet, '??');
      }
      // console.log(answer[1]);
      let temp = bullet;
      // if (answer[1] != -1) {
      // }
      // let rm = 0;
      // for (let m = 0; m < answer[1].length; i++) {
      //   if (answer[1][m]) {
      //     let tmp = bullets[m - rm];
      //     bullets[m - rm] = bullets[bullets.length];
      //     bullets[bullets.length] = tmp;
      //   }
      // }
      bullets[i] = bullets[bullets.length - 1];
      bullets[bullets.length - 1] = temp;
      bullets.pop();
      // i -= answer[1];
      i--;
    }
  }
}
playerMoveLoop();
BulletMoveLoop();
window.requestAnimationFrame(BulletMoveLoop);
window.requestAnimationFrame(playerMoveLoop);
setInterval(BulletMoveLoop, 25);
setInterval(playerMoveLoop, 20);
