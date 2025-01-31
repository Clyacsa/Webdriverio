const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');
const CheckoutPage = require('../pages/checkout.page');

describe('Checkout Negative Tests', () => {
      
  it('Should be true URL', async () => {
    await browser.url('https://www.saucedemo.com/');
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('The cart page should be displayed after clicking on Cart icon', async () => {
    await InventoryPage.clickOnCartLink();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The products should not be displayed on Cart page', async () => {
    await expect (await (CartPage.cartItemName).isExisting()).toBe(false);
  })

  it('The User should be located on the Cart page after clicking [Checkout] with empty cart', async () => {
    await CartPage.clickCheckoutButton();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The Error message should be displayed when the User clicks [Checkout] with empty cart', async () => {
    const errorMessage = await $('.error-message-container');
    expect(await errorMessage.getText()).toEqual('Cart is empty');
  })
})