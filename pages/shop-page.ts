import {Page} from "playwright";

export const cartButton : string = '//button[@onclick="goToCart()"]';
const aloeMoisturizers : string =
    '//*[contains(text(),"Aloe")]/following-sibling::button[contains(text(),"Add")]';
const almondMoisturizers : string =
    '//*[contains(text(),"Almond")]/following-sibling::button[contains(text(),"Add")]';
const SPF50Sunscreen : string =
    '//*[contains(text(),"SPF-50")]/following-sibling::button[contains(text(),"Add")]'
const SPF30Sunscreen : string =
    ('//*[contains(text(),"SPF-30")]/following-sibling::button[contains(text(),"Add")]')
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
    for (let i = 1; i < products.length; i++) {
        const productPrice = parseInt(await products[i].innerText());
        const leastExpensiveProductPrice = parseInt(await leastExpensiveProduct.innerText());
        if (productPrice < leastExpensiveProductPrice) {
            leastExpensiveProduct = products[i];
        }
    }
    return leastExpensiveProduct;
}