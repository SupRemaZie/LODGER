import { test, expect, type Page } from '@playwright/test';

let page: Page;

test.describe('Tous les tests en lien avec la page de garde', async () => {

    test.beforeAll('La page de garde doit être accessible', async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('/fr');
        const response = await page.waitForResponse(resp => resp.url().includes('/fr/deposit/home') && resp.status() === 200);
        expect(response.ok(), 'La page de garde est accessible').toBeTruthy();
    })

    test('La page de garde doit avoir du contenu', async() => {

        const content = page.locator('#content');
        await expect(content, 'La page de garde doit avoir du contenu visible').toBeVisible();

        const contentTitle = content.locator('>span');
        await expect(contentTitle, 'Le titre du contenu est visible').toBeVisible();
        await expect(contentTitle, 'Le titre du contenu possède un titre').toHaveText(/./);

        const contentButtons = await content.locator('button').all();
        expect(contentButtons, 'Le contenu doit avoir 2 boutons').toHaveLength(2);
        for (const button of contentButtons) {
            await expect(button, 'Le bouton doit être visible').toBeVisible();
            await expect(button.locator('img'), 'Le bouton doit avoir une image').toBeVisible();
            await expect(button.locator('span'), 'Le bouton doit avoir un titre').toBeVisible();
            await expect(button.locator('span'), 'Le titre du bouton doit avoir du texte').toHaveText(/./);
        }
    })
});
