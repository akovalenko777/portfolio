import { defineConfig } from 'vite';
import { resolve, extname, basename, relative } from 'path';
import { readdirSync, statSync } from 'fs';
import injectHTML from 'vite-plugin-html-inject';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

function getHtmlEntries(dir, entries = {}) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = resolve(dir, file);
    if (file === 'node_modules' || file === 'dist' || file === 'src') continue;

    if (statSync(fullPath).isDirectory()) {
      getHtmlEntries(fullPath, entries);
    } else if (extname(file) === '.html') {
      const relativePath = relative(process.cwd(), fullPath);
      const name = relativePath.replace(/\.html$/, '').replace(/\\/g, '/');
      entries[name || 'main'] = fullPath;
    }
  }
  return entries;
}

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    injectHTML(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|webp)$/i,
      includePublic: true,
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: {
        lossless: false,
        quality: 80,
      },
    })
  ],

  build: {
    rollupOptions: {
      input: getHtmlEntries(process.cwd()),
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|webp|avif)$/i.test(assetInfo.name)) {
            return assetInfo.originalFileName.replace('src/', '')
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
    },
  },
});