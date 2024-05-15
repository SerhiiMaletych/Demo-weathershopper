import {Page} from 'playwright';
import {expect} from "@playwright/test";

const temperatureElement :string = '//*[@id="temperature"]';
const buyMoistButton : string = '//button[text()="Buy moisturizers"]';
const butSunscreenButton : string = '//button[text()="Buy sunscreens"]';
export const getTemperature = async (page: Page): Promise<number> => {

    const temperatureText = await page.locator(temperatureElement).textContent();
    // @ts-ignore
    return parseInt(temperatureText.match(/\d+/)[0]);
};
export const checkWeatherAndClick = async (page: Page, temperature: number): Promise<void> => {
    if (temperature < 19) {
        await page.click(buyMoistButton);
        await expect(page).toHaveURL(/moisturizer/);
    } else if (temperature > 34) {
        await page.click(butSunscreenButton);
        await expect(page).toHaveURL(/sunscreen/);
    }
};