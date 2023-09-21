import assert from "assert";
import * as locators from "../../locators/weatherShopper.locators";

export async function verifyNumberOfAddedProducts(cartItemNumber, expectedNumberOfAddedProducts) {
  const viewCartButtonText = await cartItemNumber.getText();
  const numberOfProductsInViewCart = parseInt(viewCartButtonText.replace("Cart- item(s)", ""), 10);
  assert.strictEqual(
    numberOfProductsInViewCart, expectedNumberOfAddedProducts, "Number of added products does not match the cart");
  console.log(`numberOfProductsInViewCart === ${expectedNumberOfAddedProducts}`);
};
export async function priceOfProducts() {
  const priceElements = await locators.checkoutProductPrices();
  let totalPrice = 0;
  for (const priceElement of priceElements) {
    const priceText = await priceElement.getText();
    const itemPrice = parseFloat(priceText);
    totalPrice = totalPrice + itemPrice;
  }
  return totalPrice;
};
export async function verifyProductsTotal() {
  const sumOfPrice = await priceOfProducts();
  const totalPriceText = await locators.totalPriceLocator.getText();
  const totalPrice = parseInt(totalPriceText.replace('Total: Rupees ', ''), 10);
  assert.strictEqual(sumOfPrice, totalPrice, "Sum of Product Prices is not equal to the Total Price");
  console.log("Sum of Product Prices is equal to the Total Price");
};