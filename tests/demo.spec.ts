import {test, expect} from '@playwright/test';
import {getTemperature, checkWeatherAndClick} from "../pages/main-page";
import {notEmptyCartButton, addItemsToTheCart} from "../pages/shop-page";
import {countCartElements} from "../pages/cart-page";
import {fillFormAndSubmit, submitButton} from "../pages/checkout-page";
import {paymentFailedMessage, paymentSucceededMessage} from "../pages/confirmation-page";

test('Check user can accomplish a full flow', async ({ page }) => {
    await page.goto("/");
    const temperature = await getTemperature(page);
    await checkWeatherAndClick(page, temperature);

    await addItemsToTheCart(page);
    await page.click(notEmptyCartButton);
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
