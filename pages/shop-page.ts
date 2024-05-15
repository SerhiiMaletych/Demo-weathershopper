import {Page} from "playwright";

export const cartButton : string = '//button[@onclick="goToCart()"]';
const aloeMoisturizers : string =
    '//*[contains(translate(text(), \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\'), "aloe")]/following-sibling::button';
const almondMoisturizers : string =
    '//*[contains(translate(text(), \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\'), "almond")]/following-sibling::button';
const SPF50Sunscreen : string =
    '//*[contains(text(),"SPF-50")]/following-sibling::button'
const SPF30Sunscreen : string =
    ('//*[contains(text(),"SPF-30")]/following-sibling::button')
export const addAloeMoisturizer = async (page: Page) => {
    const leastExpensiveAloeMoisturizer = await getLeastExpensiveProduct( await page.$$(aloeMoisturizers));
    await leastExpensiveAloeMoisturizer?.click();
}
export const addAlmondMoisturizer = async (page: Page) => {
    const leastExpensiveAlmondMoisturizer = await getLeastExpensiveProduct(await page.$$(almondMoisturizers));
    await leastExpensiveAlmondMoisturizer?.click();
}

export const addSPF50Sunscreen = async (page : Page) => {
    const leastExpensiveSunscreen = await getLeastExpensiveProduct(await page.$$(SPF50Sunscreen));
    await leastExpensiveSunscreen?.click();
}
export const addSPF30Sunscreen = async (page : Page) => {
    const leastExpensiveSunscreen = await getLeastExpensiveProduct(await page.$$(SPF30Sunscreen));
    await leastExpensiveSunscreen?.click();
}
async function getLeastExpensiveProduct(products: any[]) {
    if (products.length === 0) return null;

    let leastExpensiveProduct = products[0];
    let leastExpensiveProductPrice = await getProductPrice(products[0]);

    for (let i = 1; i < products.length; i++) {
        const productPrice = await getProductPrice(products[i]);

        // @ts-ignore
        if (!isNaN(<number>productPrice) && productPrice < leastExpensiveProductPrice) {
            leastExpensiveProduct = products[i];
            leastExpensiveProductPrice = productPrice;
        }
    }
    return leastExpensiveProduct;
}

async function getProductPrice(productElement: any): Promise<number | null> {
    const buttonText = await productElement.getAttribute('onclick');
    const matches = buttonText.match(/\d+/g); // Match all numeric values
    if (matches && matches.length > 0) {
        // Assuming the last numeric value is the price
        const price = parseInt(matches[matches.length - 1]);
        return price;
    } else {
        return null; // Unable to extract price
    }
}