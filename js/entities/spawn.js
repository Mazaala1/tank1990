export class Spawn {
  constructor(y, x) {
    this.spawnTextures = [];
    this.size = 32;
    this.len = 4;
    this.y = y;
    this.x = x;
    for (let i = 0; i < this.len; i++) {
      const texture1 = PIXI.Texture.from('assets/spawn' + i + '.png');
      this.spawnTextures.push({ texture: texture1, time: 100 });
    }
    const spawn = new PIXI.AnimatedSprite(this.spawnTextures);
    spawn.y = y * this.size;
    spawn.x = x * this.size;
    spawn.width = this.size;
    spawn.height = this.size;
    spawn.gotoAndPlay(0);
    return spawn;
  }
}
