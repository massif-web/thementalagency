import sharp from "sharp";

const SIZE = 256;
const FRAMES = 5;
const ALPHA = 128;

for (let f = 0; f < FRAMES; f++) {
  const pixels = Buffer.alloc(SIZE * SIZE * 4);

  for (let i = 0; i < pixels.length; i += 4) {
    const v = Math.random() * 255;
    pixels[i] = v;
    pixels[i + 1] = v;
    pixels[i + 2] = v;
    pixels[i + 3] = ALPHA;
  }

  await sharp(pixels, {
    raw: { width: SIZE, height: SIZE, channels: 4 },
  })
    .png()
    .toFile(`./src/assets/img/grain-${f}.png`);
}
