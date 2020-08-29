export class Explosion {
  constructor(y, x, type) {
    this.size = 32;
    this.y = y;
    this.x = x;
    this.len = 5;
    if (type == 'bullet') this.len = 3;
    this.explosionTextures = [];
    for (let i = 0; i < this.len; i++) {
      console.log('assets/' + type + '_explosion' + i + '.png');
      const texture1 = PIXI.Texture.from(
        'assets/' + type + '_explosion' + i + '.png'
      );
      this.explosionTextures.push({ texture: texture1, time: 100 });
    }
    const explosion = new PIXI.AnimatedSprite(this.explosionTextures);
    explosion.y = y * this.size;
    explosion.x = x * this.size;
    explosion.width = this.size;
    explosion.height = this.size;
    explosion.gotoAndPlay(0);
    return explosion;
  }
}
