export class Shield {
    constructor(y, x) {
      this.size = 32;
      this.y = y;
      this.x = x;
      this.len = 2;
      this.shieldTextures = [];
      for (let i = 0; i < this.len; i++) {
        const texture1 = PIXI.Texture.from(
          'assets/shield' + i + '.png'
        );
        this.shieldTextures.push({ texture: texture1, time: 100 });
      }
      const shield = new PIXI.AnimatedSprite(this.shieldTextures);
      shield.gotoAndPlay(0);
      shield.y = y * this.size;
      shield.x = x * this.size;
      shield.width = this.size;
      shield.height = this.size;
      this.body = shield;
      return shield;
    }
  }
  