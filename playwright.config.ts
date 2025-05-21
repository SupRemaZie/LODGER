import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: 'html',
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
    timeout: 30000,
    retries: 1,
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
    ],
});

