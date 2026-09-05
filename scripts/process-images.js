import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

const IMG_DIR = path.resolve('src/assets/images');

async function convertImages() {
  if (!(await fs.pathExists(IMG_DIR))) return;

  const files = await fs.readdir(IMG_DIR);
  // Look for source images, but skip files that are already webp
  const images = files.filter(file => /\.(png|jpe?g)$/i.test(file));

  for (const file of images) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const destPath = path.join(IMG_DIR, `${baseName}.webp`);

    // Skip if the webp version already exists to keep it fast
    if (await fs.pathExists(destPath)) continue;

    console.log(`📸 Converting image: ${file} ➔ ${baseName}.webp`);
    await sharp(path.join(IMG_DIR, file))
      .webp({ quality: 80 })
      .toFile(destPath);
  }
}

convertImages();