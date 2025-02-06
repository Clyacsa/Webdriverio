const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');

describe('Checkout Negative Tests', () => {
      
  beforeEach(async () => {
          await LoginPage.open();
          await LoginPage.loginUser('standard_user', 'secret_sauce');
    });
      
  it('Should be true URL', async () => {
          await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
      }) 

  it('The cart page should be displayed after clicking on Cart icon', async () => {
    await InventoryPage.clickOnCartLink();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The products should not be displayed on Cart page', async () => {
    await InventoryPage.clickOnCartLink();
    await CartPage.assertEmptyCart();
  })

  it('The User should be located on the Cart page after clicking [Checkout] with empty cart', async () => {
    await InventoryPage.clickOnCartLink();
    await CartPage.assertEmptyCart();
    await CartPage.clickCheckoutButton();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The Error message should be displayed when the User clicks [Checkout] with empty cart', async () => {
    await InventoryPage.clickOnCartLink();
    await CartPage.assertEmptyCart();
    await CartPage.clickCheckoutButton();
    await CartPage.assertErrorMessage('Cart is empty');
  })
})