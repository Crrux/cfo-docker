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
  ], server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: ['front'],
    watch: { usePolling: true },
    hmr: {
      host: 'localhost',
      port: 5174,
      protocol: 'ws',
      clientPort: 80
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 5174,
    host: true,
    strictPort: true,
    allowedHosts: ['front']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});