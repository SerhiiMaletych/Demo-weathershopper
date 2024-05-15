import {test, expect} from '@playwright/test';
import {getTemperature, checkWeatherAndClick} from "../pages/main-page";
import {
    addAloeMoisturizer,
    addAlmondMoisturizer,
    addSPF30Sunscreen,
    addSPF50Sunscreen,
    cartButton
} from "../pages/shop-page";
import {countCartElements} from "../pages/cart-page";
import {fillFormAndSubmit, submitButton} from "../pages/checkout-page";
import {paymentFailedMessage, paymentSucceededMessage} from "../pages/confirmation-page";

test('Check user can make a full flow', async ({ page }) => {
    await page.goto("/");
    const temperature = await getTemperature(page);
    await checkWeatherAndClick(page, temperature);
    await page.waitForTimeout(2000);
    const h2Text = await page.$eval('h2', (element: HTMLElement) => element.textContent);
    if(h2Text=="Moisturizers"){
        await addAloeMoisturizer(page);
        await addAlmondMoisturizer(page);
    }
    else if(h2Text=="Sunscreens"){
        await addSPF50Sunscreen(page);
        await addSPF30Sunscreen(page);
    }
    await page.click(cartButton);

    const trCount = await countCartElements(page);
    expect(trCount).toBe(2);

    await page.click(submitButton);
    await  fillFormAndSubmit(page);
    if(await page.isVisible(paymentFailedMessage)){
        await page.goBack();
        await  fillFormAndSubmit(page);
    }
    await page.isVisible(paymentSucceededMessage);
});
