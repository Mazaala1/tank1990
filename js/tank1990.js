import { Map } from './entities/map.js';
import { Tank } from './entities/tank.js';
import { Explosion } from './entities/explosion.js';
import { Spawn } from './entities/spawn.js';
import { Bot } from './entities/bot.js';
const cellSize = 32,
  width = 13,
  height = 13;
const app = new PIXI.Application({
  width: width * cellSize,
  height: height * cellSize,
  backgroundColor: 0x000000,
});
const gameBoard = new PIXI.Container();

let map = new Map();
let player = new Tank(12, 4, 0, map);
let shot = false;

gameBoard.addChild(player.body);
gameBoard.addChild(map.body);

app.stage.addChild(gameBoard);
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
let botX = [6, 12, 0],
  cnt = 50,
  choose = 0;
let bots = [];
let bullets = [];
let new_bot;
function playerMoveLoop() {
  // moves: left, up, right, down
  if (cnt == 70 && bots.length < 4) {
    // /*
    // Spawn:
    let spawn = new Spawn(0, botX[choose]);
    gameBoard.addChild(spawn);
    setTimeout(() => {
      gameBoard.removeChild(spawn);
    }, 500);
    // */
  }
  if (cnt == 99 && bots.length < 4) {
    new_bot = new Bot(0, botX[choose], 2);
    bots.push(new_bot);
    console.log(bots);
    gameBoard.addChild(new_bot.body);
    choose++;
    choose %= botX.length;
  }
  if (cnt % 10 == 0) {
    bots.forEach((bot) => {
      let shoot_check = Math.floor(Math.random() * 3);
      if (shoot_check == 1) {
        let bullet = bot.fire();
        bullets.push(bullet);
        gameBoard.addChild(bullet.body);
      }
    });
  }
  if (cnt % 2 == 0) {
    // console.log(cnt, "cnt");
    bots.forEach((bot) => {
      if (!bot.freeze) {
        bot.move(map);
      } else {
        setTimeout(() => {
          bot.freeze = 0;
        }, 5000);
      }
    });
  }
  if (keyState[37]) player.move(3, map);
  else if (keyState[38]) player.move(0, map);
  else if (keyState[39]) player.move(1, map);
  else if (keyState[40]) player.move(2, map);
  // cnt = Math.min(100, cnt + 1);
  cnt++;
  cnt %= 100;
  // if(cnt == 100) {

  // }
  setTimeout(playerMoveLoop, 20);
}
function BulletMoveLoop() {
  if (keyState[32] && !shot) {
    let bullet = player.fire();
    /*
    // Explosion:
    let explosion = new Explosion(player.y, player.x, 'big');
    gameBoard.addChild(explosion);
    setTimeout(() => {
      gameBoard.removeChild(explosion);
    }, 500);
    */
    bullets.push(bullet);
    gameBoard.addChild(bullet.body);
    shot = true;
  }
  bullets.forEach((bullet) => {
    bullet.move();
  });
  setTimeout(BulletMoveLoop, 25);
}
playerMoveLoop();
BulletMoveLoop();
