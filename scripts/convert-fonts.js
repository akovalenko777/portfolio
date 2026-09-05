import fs from 'fs-extra';
import path from 'path';
import wawoff2 from 'wawoff2';

const SRC_DIR = path.resolve('src/assets/raw-fonts');
const DIST_DIR = path.resolve('src/assets/fonts');

async function convertFonts() {
  // Ensure target directories exist
  await fs.ensureDir(SRC_DIR);
  await fs.ensureDir(DIST_DIR);

  const files = await fs.readdir(SRC_DIR);
  const fontFiles = files.filter(file => /\.(ttf|otf)$/i.test(file));

  if (fontFiles.length === 0) {
    console.log('No .ttf or .otf fonts found in src/assets/raw-fonts/');
    return;
  }

  for (const file of fontFiles) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const destFile = `${baseName}.woff2`;
    const destPath = path.join(DIST_DIR, destFile);

    // Skip conversion if the woff2 file already exists to save build time
    if (await fs.pathExists(destPath)) {
      continue;
    }

    console.log(`Converting: ${file} ➔ ${destFile}...`);
    try {
      const inputBuffer = await fs.readFile(path.join(SRC_DIR, file));
      const outputBuffer = await wawoff2.compress(inputBuffer);
      await fs.writeFile(destPath, outputBuffer);
      console.log(`✓ Successfully generated ${destFile}`);
    } catch (err) {
      console.error(`✕ Failed converting ${file}:`, err);
    }
  }
}

convertFonts();