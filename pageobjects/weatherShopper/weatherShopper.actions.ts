import * as locators from "../../locators/weatherShopper.locators";

export async function goToURL(url: string) {
    browser.url("https://weathershopper.pythonanywhere.com/");
};
export async function buy(buyProduct) {
    const timeout = 200000;
    await buyProduct.waitForEnabled({ timeout });
    await buyProduct.click();
};
export async function temperatureChecker() {
  const currentTemperature = await $(locators.temperature);
  const temperatureLimitM = 19;
  const temperatureLimitS = 34;
  const currentTemperatureText = await currentTemperature.getText();
  const currentTemperatureValue = parseFloat(currentTemperatureText.replace("℃", ""));
  if (currentTemperatureValue < temperatureLimitM) {
    const buyProductM = $(locators.buyMoisturizersLocator); 
    await buy(await buyProductM);
  } else if (currentTemperatureValue > temperatureLimitS) {
    const buyProductS = $(locators.buySunscreensLocator); 
    await buy(await buyProductS);
  } else {
    console.log("Current Temperature doesn't require shopping for the selected product type.");
  }
};
export async function add(addButton) {
  await addButton.waitForDisplayed({ timeout: 2500000 });
  await addButton.click();
};
export async function moisturizerAloe() { 
    const priceElementsAloe = await locators.productPriceElements("Aloe");
    const moisturizerDetails1 = [];
    for (let i = 0; i < priceElementsAloe.length; i++) {
    const priceText = await priceElementsAloe[i].getText();
    const itemPrice = parseFloat(priceText.replace(/^Price: (Rs\.)?/, ""));
    moisturizerDetails1.push(itemPrice);
  }
  moisturizerDetails1.sort((a, b) => a - b);
  if (moisturizerDetails1.length > 0) {
    return moisturizerDetails1[0]; 
      } 
  else {
    return null;
      }
};
export async function moisturizerAlmond() {
    const priceElementsAlmond = await locators.productPriceElements("Almond");
    const moisturizerDetails2 = [];
    for (let i = 0; i < priceElementsAlmond.length; i++) {
      const priceText = await priceElementsAlmond[i].getText();
      const itemPrice = parseFloat(priceText.replace(/^Price: (Rs\.)?/, ""));
      moisturizerDetails2.push(itemPrice);
  }
    moisturizerDetails2.sort((a, b) => a - b);
  if (moisturizerDetails2.length > 0) {
    return moisturizerDetails2[0]; 
      } 
  else {
    return null; 
      }
};
export async function sunscreenSPF30() {  
    const priceElementsSPF30 = await locators.productPriceElements("SPF-30");
    const sunscreenDetails1 = [];
    for (let i = 0; i < priceElementsSPF30.length; i++) {
    const priceText = await priceElementsSPF30[i].getText();
    const itemPrice = parseFloat(priceText.replace(/^Price: (Rs\.)?/, ""));
    sunscreenDetails1.push(itemPrice);
  }
  sunscreenDetails1.sort((a, b) => a - b);
  if (sunscreenDetails1.length > 0) {
    return sunscreenDetails1[0];
      } 
  else {
    return null;
      }
};   
export async function sunscreenSPF50() {
  const priceElementsSPF50 = await locators.productPriceElements("SPF-50");
  const sunscreenDetails2 = [];
  for (let i = 0; i < priceElementsSPF50.length; i++) {
  const priceText = await priceElementsSPF50[i].getText();
  const itemPrice = parseFloat(priceText.replace(/^Price: (Rs\.)?/, ""));
  sunscreenDetails2.push(itemPrice);
  }
  sunscreenDetails2.sort((a, b) => a - b);
  if (sunscreenDetails2.length > 0) {
    return sunscreenDetails2[0];
      } 
  else {
    return null; 
      }
};
export async function leastExpensiveProduct(){
  if (await locators.productTypeM.isDisplayed()) { 
    const minPriceM1 = await moisturizerAloe();
    const addButtonM1 = await $(await locators.productLocator(minPriceM1));
    const minPriceM2 = await moisturizerAlmond();
    const addButtonM2 = await $(await locators.productLocator(minPriceM2));
    await add(addButtonM1);
    await add(addButtonM2);
  }
  else if (await locators.productTypeS.isDisplayed()){
    const minPriceS1 = await sunscreenSPF30();  
    const addButtonS1 = await $(await locators.productLocator(minPriceS1));
    const minPriceS2 = await sunscreenSPF50();
    const addButtonS2 = await $(await locators.productLocator(minPriceS2));
    await add(addButtonS1);
    await add(addButtonS2);
  }
  else {
    console.log("Nothing found which could be added to the cart");
  }
};
export async function cart(cartButton){
  await cartButton.waitForDisplayed();
  await cartButton.click();
};
export async function click() {
    await locators.payWithCard.waitForDisplayed({ timeout: 200000 });
    await locators.payWithCard.click();
};
export async function  enterdetails (emailValue, cardNumber, cardExpiry, cardcvc, zip) {
  const iframe = await $(locators.iframelocator);
  await iframe.waitForDisplayed({ timeout: 200000 });
  await browser.switchToFrame(iframe);
  await locators.emailLocator.waitForDisplayed({ timeout: 200000});
  await locators.emailLocator.click();
  await locators.emailLocator.setValue(await emailValue);
  await locators.cardNumberLocator.waitForEnabled({timeout: 200000});
  await locators.cardNumberLocator.click();
  const cardNumberChars = cardNumber.split('');
  for (const char of cardNumberChars) {
    await browser.keys(char);
  }
  await locators.cardExpiryLocator.waitForEnabled({timeout: 200000});
  await locators.cardExpiryLocator.click();
  const cardExpiryChars = cardExpiry.split('');
  for (const char of cardExpiryChars) {
    await browser.keys(char);
  }
  await locators.cvcLocator.waitForDisplayed({timeout: 200000});
  await locators.cvcLocator.click();
  await locators.cvcLocator.setValue(cardcvc);
  await locators.zipLocator.waitForDisplayed({timeout: 200000});
  await locators.zipLocator.click();
  await locators.zipLocator.setValue(zip);
};
export async function pay(){
  await locators.payButtonLocator.waitForDisplayed({timeout: 200000});
  await locators.payButtonLocator.click();
};
export async function paymentSuccess(){
  await locators.paymentSuccessLocator.waitForDisplayed({timeout: 20000});
};