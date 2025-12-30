
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Tải biến môi trường từ file .env hoặc từ Vercel settings
  // Use '.' instead of process.cwd() to resolve directory path and avoid TypeScript errors in certain environments
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Truyền API_KEY vào process.env để code trong app có thể truy cập
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    server: {
      port: 3000,
    },
  };
});
