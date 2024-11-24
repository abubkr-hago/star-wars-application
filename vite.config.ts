/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Set to jsdom for React testing
    globals: true, // This allows you to use `describe`, `it`, and `expect` globally
    setupFiles: './setupTests.ts', // Path to your setup file
    coverage: {
      reporter: ['html'],
      reportsDirectory: './coverage',
    },
  },
});
