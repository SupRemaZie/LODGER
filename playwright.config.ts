import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
        baseURL: 'http://localhost:3000',
        headless: true,
    },
    testDir: './tests',
    testMatch: '**/*.spec.ts',
});

