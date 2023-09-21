import { Given, When, Then } from "@wdio/cucumber-framework";
import * as locators from "../locators/weatherShopper.locators";
import * as actions from "../support/actions/weatherShopper.actions";
import * as assertions from "../support/assertions/weatherShopper.assertions";

Given("the browser is on the home page", async function() {
  actions.goToURL("/");
});
When('the user selects product type for weather temperature degrees', async function () {
  await actions.temperatureChecker();
});
Then('the two different least expensive selected products from the product type should be added to the cart', async function () {
    await actions.leastExpensiveProduct();
    const expectedNumberOfAddedProduct = 2;
    await assertions.verifyNumberOfAddedProducts(await locators.cartItemNumber, expectedNumberOfAddedProduct);
    await actions.cart(await locators.cartButton);  
    await assertions.verifyProductsTotal();  
  });
When("the user verifies the shopping cart and clicks on the Pay with Card button", async function(){
    await actions.click();
});
Then ("the user enters payment details, and a confirmation PAYMENT SUCCESS window should appear", async function(){
    await actions.enterdetails ('test@example.com', '4242424242424242', '1234', '567', '12345');
    await actions.pay();
    await actions.paymentSuccess();
});