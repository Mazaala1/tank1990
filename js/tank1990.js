const cellSize = 32; // may change later
const width = 13,
  height = 13;
const app = new PIXI.Application({
  width: width * cellSize,
  height: height * cellSize,
  backgroundColor: 0xffffff,
});

document.body.appendChild(app.view);
// alert('hello\n');
