import {Page} from "playwright";

export const countCartElements = async (page: Page): Promise<number> => {
    return await page.$$eval('tbody tr', trs => trs.length);
}
