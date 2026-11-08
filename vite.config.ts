import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages the site lives at https://<account>.github.io/filou/; locally it stays at the root.
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/filou/' : '/',
  plugins: [react()],
});
