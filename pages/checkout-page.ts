import {Page} from "playwright";

export const submitButton: string = '//button[@type="submit"]';
export const frameLocator = '//iframe[contains(@name,\'stripe_checkout_app\')]';
const testEmail : string = "testEmail@gmail.com";
const testCardNumber : string = "4242424242424242";
const testDate : string = "12/29";
const testCVC : string = "123";
export const fillFormAndSubmit = async (page : Page)=> {
    await page.frameLocator(frameLocator).locator('//input[@id="email"]').fill(testEmail);
    await page.frameLocator(frameLocator).locator('//input[@id="card_number"]').fill(testCardNumber);
    await page.frameLocator(frameLocator).locator('//input[@id="cc-exp"]').fill(testDate);
    await page.frameLocator(frameLocator).locator('//input[@id="cc-csc"]').fill(testCVC);
    await page.frameLocator(frameLocator).locator('//button[@id="submitButton"]').click();
}