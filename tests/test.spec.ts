import { test, expect } from '@playwright/test';

test('homepage has expected title', async ({ page }) => {
    await page.goto('/');
    expect(page.getByText("Type de biens")).toBeVisible()
});
test('Next button should be disabled if no type is choosen', async ({ page }) => {
    await page.goto('/');
    expect(page.getByRole("button", { name: "Suivant" })).toBeDisabled()
});
