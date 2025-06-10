import { test, expect, type Page } from '@playwright/test';

let page: Page;

test.describe('Tous les tests en lien avec la sidebar', async () => {

    test.beforeAll('La sidebar est visible', async ({browser}) => {
        page = await browser.newPage();
        await page.goto('/fr');
        await page.waitForResponse(resp => resp.url().includes('/fr/deposit/home') && resp.status() === 200);
        await isSidebarVisible(page);
    });

    test('La sidebar possède bien un espace logo avec le titre du site', async() => {
        const sidebar = page.locator('#sidebar');
        const sidebarDiv = sidebar.locator('>div');

        const logo = sidebarDiv.locator('>a>img');
        await expect(logo, 'Le logo du site est bien visible').toBeVisible();

        const title = sidebarDiv.locator('>p');
        await expect(title, 'Le titre du site est bien visible').toBeVisible();
        await expect(title, 'Le titre du site possède bien du texte').toHaveText(/./);
    });

    test("La sidebar possède bien un espace pour indiquer les étapes", async() => {
        const sidebar = page.locator('#sidebar');
        const sidebarSteps = sidebar.locator('#steps');

        await expect(sidebarSteps).toBeVisible();
        const allSteps = await sidebarSteps.locator(">div>div").all();
        expect(allSteps, "L'espace pour indiquer les étapes possède bien 3 étapes").toHaveLength(3);
    });

    test('La sidebar possède un espace pour changer de langue et demander de l\'aide', async() => {
        const downSideBar = page.locator("#down-sidebar")
        await expect(downSideBar, "L'espace dans la sidebar pour changer de langue et demande de l'aide est bien visible").toBeVisible();
    });

    test('La sidebar possède bien le bouton pour changer de langue', async() => {
        const downSidebar = page.locator("#down-sidebar");
        const languageButton = downSidebar.locator(">button");
        await expect(languageButton, 'Le bouton pour changer de langue est bien visible').toBeVisible();
        await expect(languageButton, 'Le bouton pour changer de langue possède bien du texte pour indiquer la langue').toHaveText(/./)
    });

    test('La sidebar possède bien un espace au cas où l\'utilisateur à besoin d\'aide', async() => {
        const downSidebar = page.locator("#down-sidebar");
        const helpDiv = downSidebar.locator(">div");
        await expect(helpDiv, "L'espace d'aide est bien visible").toBeVisible();

        const helpDivImg = helpDiv.locator('img');
        await expect(helpDivImg, "L'espace d'aide possède bien une image visible pour représenter l'espace d'aide").toBeVisible();

        const helpDivTexts = await helpDiv.locator('p').all();
        const helpDivTitle = helpDivTexts[0];
        await expect(helpDivTitle, "Le titre de l'espace d'aide est bien visible").toBeVisible();
        await expect(helpDivTitle, "Le titre de l'espace d'aide possède bien du texte").toHaveText(/./);

        const helpDivActionText = helpDivTexts[1];
        await expect(helpDivActionText, "L'espace d'aide possède bien un texte d'action visible").toBeVisible();
        await expect(helpDivActionText, "Le texte d'action de l'espace d'aide possède bien du texte").toHaveText(/./);

        const helpDivHelpButton = helpDiv.locator('button');
        await expect(helpDivHelpButton, "Le bouton de l'espace d'aide est bien visible").toBeVisible();
        await expect(helpDivHelpButton, "Le bouton de l'espace d'aide possède bien du texte").toHaveText(/./);
    });
});

async function isSidebarVisible(page: Page) {
    await expect(page.locator('#sidebar'), 'La sidebar est bien visible').toBeVisible();
}

export { isSidebarVisible };

