import { test, expect, type Page } from '@playwright/test';

let page: Page;

test.describe('Tous les tests en lien avec le header', async () => {

    test.beforeAll('Le header est visible', async ({browser}) => {
        page = await browser.newPage();
        await page.goto('/fr');
        await page.waitForResponse(resp => resp.url().includes('/fr/deposit/home') && resp.status() === 200);
        await isHeaderVisible(page);
    });

    test('Le header possède un titre et un sous-titre avec du texte', async () => {
        const header = page.locator('#header');

        const headerTitles = await header.locator('span').all();
        expect(headerTitles, 'Le header possède bien 2 titres').toHaveLength(2);

        const headerTitle = headerTitles[0];
        await expect(headerTitle, 'Le titre du header est bien visible').toBeVisible();
        await expect(headerTitle, 'Le titre du header possède du texte').toHaveText(/./);

        const headerSubTitle = headerTitles[1];
        await expect(headerSubTitle, 'Le sous-titre du header est bien visible').toBeVisible();
        await expect(headerSubTitle, 'Le sous-titre du header possède bien du texte').toHaveText(/./);
    });

    test('Le header possède bien un bouton', async() => {
        const header = page.locator('#header');

        const button = header.locator('button');
        await expect(button, 'Le bouton du header est bien visible').toBeVisible();
        await expect(button, 'le bouton du header possède bien du texte pour informer ce qu\'il fait').toHaveText(/./);
    });
});

async function isHeaderVisible(page: Page) {
    await expect(page.locator('#header'), 'Le header est bien visible').toBeVisible();
}

async function isHeaderWithTitleMessage(page: Page, titleMessage: string) {
    await expect(page.locator('#page-title'), 'Le titre du header possède bien le message ' + titleMessage).toHaveText(titleMessage);
}

export { isHeaderVisible, isHeaderWithTitleMessage };

