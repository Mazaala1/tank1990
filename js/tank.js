const cellSize = 20; // may change later
const width = 30,
  height = 30;
const app = new PIXI.Application({
  width: width * cellSize,
  height: height * cellSize,
  backgroundColor: 0xffffff,
});

document.body.appendChild(app.view);
// alert('hello\n');
