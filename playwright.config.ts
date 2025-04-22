import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
    }
});

