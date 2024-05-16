import {test, expect} from '@playwright/test';
import {getTemperature, checkWeatherAndClick} from "../pages/main-page";
import {notEmptyCartButton, addItemsToTheCart, emptyCartButton} from "../pages/shop-page";
import {countCartElements} from "../pages/cart-page";
import {fillFormAndSubmit, submitButton} from "../pages/checkout-page";
import {dealWithFailedPayment} from "../pages/confirmation-page";
import exp from "node:constants";

test('Check user can accomplish a full flow', async ({ page }) => {
    await page.goto("/");
    const temperature = await getTemperature(page);
    await checkWeatherAndClick(page, temperature);

    await expect(page.locator(emptyCartButton)).toBeVisible();

    await page.waitForTimeout(500)
    await addItemsToTheCart(page);
    await page.click(notEmptyCartButton);
    const trCount = await countCartElements(page);

    expect(trCount).toBe(2);

    await page.click(submitButton);
    await  fillFormAndSubmit(page);
    await dealWithFailedPayment(page);
});
