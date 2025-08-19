import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'robots.txt',
          dest: ''
        }
      ]
    })
  ],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: ['webretex.fr'],
    watch: { usePolling: true },
    hmr: {
      host: '127.0.0.1',
      port: 5174,
      protocol: 'ws',
      clientPort: 5174
    }
  },
  preview: {
      host: true,
      port: 5174,
    strictPort: true,
    allowedHosts: ['crossfitobernai.com', 'www.crossfitobernai.com'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});