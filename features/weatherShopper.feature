Feature: User shops for products based on weather conditions

  Scenario: Shop for products based on weather conditions
    Given the browser is on the home page
    When the user selects product type for weather temperature degrees
    Then the two different least expensive selected products from the product type should be added to the cart
    When the user verifies the shopping cart and clicks on the Pay with Card button
    Then the user enters payment details, and a confirmation PAYMENT SUCCESS window should appear