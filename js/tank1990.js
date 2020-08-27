import { Tank } from './entities/tank.js';
import { Map } from './entities/map.js';
const cellSize = 32; // may change later
const width = 13,
  height = 13;
const app = new PIXI.Application({
  width: width * cellSize,
  height: height * cellSize,
  backgroundColor: 0x000000,
});

document.body.appendChild(app.view);
// alert('hello\n');
const gameBoard = new PIXI.Container();
app.stage.addChild(gameBoard);
let player = new Tank(12.5, 5, 0);
gameBoard.addChild(player.body);
let map = new Map();
gameBoard.addChild(map.body);
// window.addEventListener('keydown', player.move(0));
// window.addEventListener('keyup', player.stop);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
function onKeyDown(key) {
  if (player.movingInterval != null) return;
  let moves = []; // left, up, right, down
  if (key.keyCode == '32') {
    let bullet = player.fire();
    gameBoard.addChild(bullet.body);
    this.fireInterval = setInterval(function () {
      bullet.move();
    }, 25);
  }
  if (key.keyCode == '37') player.move(3);
  if (key.keyCode == '38') player.move(0);
  if (key.keyCode == '39') player.move(1);
  if (key.keyCode == '40') player.move(2);
}
function onKeyUp(key) {
  // alert('open');
  clearInterval(player.movingInterval);
  player.movingInterval = null;
  // player.stop();
}
// window.addEventListener('keydown', test);
