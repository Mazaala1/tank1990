export function Renderer(width, height, y, x, src) {
  const texture = PIXI.Texture.from('assets/' + src + '.png');
  const sprite = new PIXI.Sprite(texture);
  sprite.height = height;
  sprite.width = width;
  sprite.x = x;
  sprite.y = y;
  return sprite;
}
