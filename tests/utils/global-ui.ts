import {expect, Page} from "@playwright/test";


async function isFooterVisible(page: Page) {
    await expect(page.locator('footer'), 'Le footer est bien visible').toBeVisible();
}

async function isHeaderVisible(page: Page) {
    await expect(page.locator('#header'), 'Le header est bien visible').toBeVisible();
}

async function isHeaderWithTitleMessage(page: Page, titleMessage: string) {
    await expect(page.locator('#page-title'), 'Le titre du header possède bien le message ' + titleMessage).toHaveText(titleMessage);
}

async function isSidebarVisible(page: Page) {
    await expect(page.locator('#sidebar'), 'La sidebar est bien visible').toBeVisible();
}


export { isFooterVisible, isHeaderVisible, isHeaderWithTitleMessage, isSidebarVisible };