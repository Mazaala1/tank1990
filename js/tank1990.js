import { Map } from "./entities/map.js";
import { Tank } from "./entities/tank.js";
import { Bot } from "./entities/bot.js";
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
  "keydown",
  function (e) {
    if (e.keyCode != 32 && e.which != 32)
      for (let i = 37; i < 41; i++) keyState[i] = false;
    keyState[e.keyCode || e.which] = true;
  },
  true
);
window.addEventListener(
  "keyup",
  function (e) {
    keyState[e.keyCode || e.which] = false;
    if (e.keyCode == 32 || e.which == 32) shot = false;
  },
  true
);
let botX = [6.5, 12.5, 0.5],
  cnt = 0,
  choose = 0;
let bots = [];
function playerMoveLoop() {
  // moves: left, up, right, down
  if (cnt == 100) {
    let new_bot = new Bot(0.5, botX[choose], 2);
    bots.push(new_bot);
    console.log(bots);
    gameBoard.addChild(new_bot.body);
    choose++;
    choose %= botX.length;
    cnt = 0;
  }
  bots.forEach((bot) => {
    bot.move();
  });
  if (keyState[37]) player.move(3);
  else if (keyState[38]) player.move(0);
  else if (keyState[39]) player.move(1);
  else if (keyState[40]) player.move(2);
  cnt++;
  setTimeout(playerMoveLoop, 20);
}
let bullets = [];
function BulletMoveLoop() {
  if (keyState[32] && !shot) {
    let bullet = player.fire();
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
