export function Renderer(width, height, y, x, src) {
  console.log('assets/' + src + '.png');
  const texture = PIXI.Texture.from('assets/' + src + '.png');
  const sprite = new PIXI.Sprite(texture);
  sprite.width = width;
  sprite.height = height;
  sprite.x = x;
  sprite.y = y;
  return sprite;
}
