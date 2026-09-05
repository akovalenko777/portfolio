import { defineConfig } from 'vite';
import { resolve, extname, basename, relative } from 'path';
import { readdirSync, statSync } from 'fs';
import injectHTML from 'vite-plugin-html-inject';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Helper function to recursively find all HTML files (excluding node_modules and dist)
function getHtmlEntries(dir, entries = {}) {
  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = resolve(dir, file);

    // Skip system or build directories
    if (file === 'node_modules' || file === 'dist' || file === 'src') continue;

    if (statSync(fullPath).isDirectory()) {
      getHtmlEntries(fullPath, entries);
    } else if (extname(file) === '.html') {
      // Create a unique key based on the relative path (e.g., "about" or "blog/post-1")
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
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: {
        lossless: false,
        quality: 80,
      },
    }),
    {
      name: 'replace-html-image-links',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          return html.replace(
            /<a href=".\/src\//g, 
              '<a href="/portfolio/'
          );
        }
      }
    }
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