import { test, expect } from '@playwright/test';

test('homepage has expected title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator("body > div > div > div.flex-grow.p-6.md\\:overflow-y-auto.md\\:p-12 > div > div > h1")).toContainText("Lodger");
});
