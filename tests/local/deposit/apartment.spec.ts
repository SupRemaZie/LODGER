import { test, expect, type Page } from '@playwright/test';
import {getTranslation} from "@/tests/utils/translation";
import {isFooterVisible, isHeaderVisible, isHeaderWithTitleMessage, isSidebarVisible} from "@/tests/utils/global-ui";

let page: Page;

test.describe('Tous les tests en lien avec la page de apartment', async () => {

    test.beforeAll('La page de apartment doit être accessible', async ({ browser }) => {
        page = await browser.newPage();
        const pageUrl = "/fr/deposit/apartment"
        await page.goto(pageUrl).then(async resp => {
                expect(resp?.url().includes(pageUrl) && resp?.status() === 200, 'La page apartment est accessible').toBeTruthy();
            }
        )
    })

    test('Vérifier que tous les composants soient présents', async() => {
        await isFooterVisible(page);

        await isHeaderVisible(page);
        const headerTitleMessage = await getTranslation('fr', 'PropertydepositPage', 'stepOne.stepOne-subOneBiens.title');
        await isHeaderWithTitleMessage(page, headerTitleMessage);

        await isSidebarVisible(page);
    });

    test('La page apartment doit avoir du contenu', async() => {

        const content = page.locator('#content');
        await expect(content, 'La page apartment doit avoir du contenu visible').toBeVisible();

        const contentTitle = content.locator("span");
        await expect(contentTitle, 'Le titre du contenu est visible').toBeVisible();
        await expect(contentTitle, 'Le titre du contenu possède le titre attendu').toHaveText(/./);

        const buttons = await content.locator("button").all();
        expect(buttons, 'Le contenu possède bien 3 boutons').toHaveLength(3);

        for (const button of buttons) {
            await expect(button, "L'un des 3 boutons est bien visibile").toBeVisible();
            await expect(button, "L'un des 3 boutons possède bien du text").toHaveText(/./)
        }
    })
});
