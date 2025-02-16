import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example of splitting large libraries into separate chunks
          react: ['react', 'react-dom'],
          vendor: ['axios', 'react-router-dom', 'preline'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: Increase chunk size limit
  },
});
