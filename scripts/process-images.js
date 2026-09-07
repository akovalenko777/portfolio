import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

// const IMG_DIR = path.resolve('src/assets/images');
const IMG_DIR = path.resolve('public/assets/images');

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }

    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;

    const ext = path.extname(entry.name);
    const baseName = path.basename(entry.name, ext);
    const destPath = path.join(dir, `${baseName}.webp`);

    // Skip if the webp version already exists to keep it fast
    if (await fs.pathExists(destPath)) continue;

    const relPath = path.relative(IMG_DIR, fullPath);
    console.log(`📸 Converting image: ${relPath} ➔ ${path.relative(IMG_DIR, destPath)}`);

    await sharp(fullPath)
      .webp({ quality: 80 })
      .toFile(destPath);
  }
}

async function convertImages() {
  if (!(await fs.pathExists(IMG_DIR))) return;
  await processDirectory(IMG_DIR);
}

convertImages();