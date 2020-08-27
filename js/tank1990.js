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
let player = new Tank(12.5, 4.5, 0);
gameBoard.addChild(player.body);
let map = new Map();
gameBoard.addChild(map.body);
// window.addEventListener('keydown', player.move(0));
// window.addEventListener('keyup', player.stop);
// window.addEventListener('keydown', onKeyDown);
// window.addEventListener('keyup', onKeyUp);
var keyState = {};    
window.addEventListener('keydown',function(e){
  keyState[37] = false;
  keyState[38] = false;
  keyState[39] = false;
  keyState[40] = false;
  keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
  keyState[e.keyCode || e.which] = false;
},true);

function gameLoop() {
  if (player.movingInterval != null) return;
  let moves = []; // left, up, right, down
  if (keyState[37]) player.move(3);
  else if (keyState[38]) player.move(0);
  else if (keyState[39]) player.move(1);
  else if (keyState[40]) player.move(2);
  setTimeout(gameLoop, 20);
};
function gameLoop1() {
  if (keyState[32]) {
    let bullet = player.fire();
    gameBoard.addChild(bullet.body);
    bullet.move();    
  }
  setTimeout(gameLoop1, 25);
};
gameLoop();
gameLoop1();
