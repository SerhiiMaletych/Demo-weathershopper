import {Page} from "playwright";
import {fillFormAndSubmit} from "./checkout-page";

export const paymentFailedMessage : string = 'h2:has-text("PAYMENT FAILED")';
export const paymentSucceededMessage : string = 'h2:has-text("PAYMENT SUCCESS")';

export const dealWithFailedPayment = async(page : Page) => {
    if(await page.isVisible(paymentFailedMessage)){
        await page.goBack();
        await  fillFormAndSubmit(page);
    }
    await page.isVisible(paymentSucceededMessage);
}