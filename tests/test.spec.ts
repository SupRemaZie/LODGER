import { test, expect } from '@playwright/test';

test('homepage has expected title', async ({ page }) => {
    await page.goto('/fr');
    await page.waitForLoadState('networkidle')
    await expect(page.getByText("Type de biens").first()).toBeVisible()
});
test('Next button should be disabled if no type is choosen', async ({ page }) => {
    await page.goto('/fr');
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole("button", { name: "Suivant" })).toBeDisabled()
});