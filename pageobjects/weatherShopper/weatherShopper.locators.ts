export const temperature = "#temperature";
export const buySunscreensLocator = "//button[text() = 'Buy sunscreens']";
export const buyMoisturizersLocator = "//button[text() = 'Buy moisturizers']";
export const productTypeM = $(`//h2[text() = 'Moisturizers']`);
export const productTypeS = $(`//h2[text() = 'Sunscreens']`);
export function productPriceElements(productType) {
    return $$(`//p[contains(text(),'${productType}')]/following-sibling::p`);
};
export async function productLocator(minPrice) {
    return `//p[contains(text(), "${minPrice}")]/following-sibling::button`;
};
export const cartItemNumber = $("#cart");
export const cartButton = $(`//button[contains(text(), 'Cart')]`);

export async function checkoutProductPrices(){
    return $$(`//td[2]`);
};
export const totalPriceLocator = $("#total");
export const payWithCard = $(`//button[@class='stripe-button-el']`);
export const iframelocator = `//iframe[@class = 'stripe_checkout_app']`;
export const emailLocator = $('#email');
export const cardNumberLocator= $("#card_number");
export const cardExpiryLocator = $("#cc-exp");
export const cvcLocator = $("#cc-csc");
export const zipLocator = $("#billing-zip");
export const payButtonLocator = $(".iconTick");
export const paymentSuccessLocator = $("//h2");