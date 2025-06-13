import { test, expect, type Page } from '@playwright/test';
import {isFooterVisible} from "@/tests/utils/global-ui";

let page: Page;

test.describe('Tous les tests en lien avec le footer', async () => {

    test.beforeAll('Le footer est visible', async ({browser}) => {
        page = await browser.newPage();
        await page.goto('/fr');
        await page.waitForResponse(resp => resp.url().includes('/fr/deposit/home') && resp.status() === 200);
        await isFooterVisible(page);
    });

    test('Le footer possède bien 3 images pour indiquer dans quel étape nous sommes', async()=> {
        const footer = page.locator('footer');

        const imgs = await footer.locator('img').all();
        expect(imgs, '').toHaveLength(3);

        const imgLighted = imgs[0];
        expect(await imgLighted.getAttribute('alt'), 'La première image est coloré').toBe("line full");

        const imgOff2 = imgs[1];
        expect(await imgOff2.getAttribute('alt'), "La deuxième image n'est pas coloré").toBe("line empty");

        const imgOff3 = imgs[2];
        expect(await imgOff3.getAttribute('alt'), "La troisième image n'est pas coloré").toBe("line empty");
    })

    test('Le footer possède bien 2 boutons', async () => {
        const footer = page.locator('footer');

        const buttons = await footer.locator("button").all();
        expect(buttons, 'Le footer possède bien 2 boutons').toHaveLength(2);

        const backButton = buttons[0];
        await expect(backButton, 'Le bouton retour est bien visible').toBeVisible();
        await expect(backButton, 'Le bouton retour possède du texte').toHaveText(/./);

        const validateButton = buttons[1];
        await expect(validateButton, 'Le bouton de validation est bien visible').toBeVisible();
        await expect(validateButton, 'Le bouton de validation possède du texte').toHaveText(/./);
    });
});
