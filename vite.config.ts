/// <reference types="vitest" />
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE_URL,
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
  };
});
