import {Page} from "playwright";

export const countCartElements = async (page: Page): Promise<number> => {
    const trCount = await page.$$eval('tbody tr', trs => trs.length);
    return trCount;
}
