const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');
const CheckoutPage = require('../pages/checkout.page');
const OverviewPage = require('../pages/overview.page');

describe('Checkout Tests', () => {
      
  it('Should be true URL', async () => {
    await browser.url('https://www.saucedemo.com/');
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('Should add item to cart when clicked', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.assertBadgeText('1');
  });
        
  it('The cart page should be displayed after clicking on Cart icon', async () => {
    await InventoryPage.clickOnCartLink();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The added product should be displayed on Card page', async () => {
    await CartPage.verifyItemInCart('Sauce Labs Backpack');
  })
   
  it('Checkout form should be displayed on Cart page', async () => {
    await CartPage.clickCheckoutButton();
    const title = await $('[data-test="title"].title').getText();
    expect(title).toEqual('Checkout: Your Information');
    await expect(CheckoutPage.firstNameField).toBeExisting();
    await expect(CheckoutPage.lastNameField).toBeExisting();
    await expect(CheckoutPage.postalCodeField).toBeExisting();
  })

  it('All values should be displayed in the filled fields in form', async () => {
    await CheckoutPage.fillCheckoutForm('Kateryna', 'Ivanova', '73000');
    await expect(CheckoutPage.firstNameField).toHaveValue('Kateryna', { ignoreCase: true });
    await expect(CheckoutPage.lastNameField).toHaveValue('Ivanova', { ignoreCase: true });
    await expect(CheckoutPage.postalCodeField).toHaveValue('73000', { ignoreCase: true });
  })

  it('The products with prices should be displayed on overview page after ckicking [Continue]', async () => {
    await CheckoutPage.clickContinueButton();
    const title = await $('[data-test="title"].title').getText();
    await expect(title).toEqual('Checkout: Overview');
    await expect(OverviewPage.ItemName).toHaveText('Sauce Labs Backpack');
    const totalPrice = await $('[data-test="subtotal-label"]').getText();
    expect(totalPrice).toEqual('Item total: $29.99');
  })

  it('The User should be redirected to Checkout Complete page and get message', async () => {
    await OverviewPage.clickONFinishButton();
    const title = await $('[data-test="title"].title').getText();
    await expect(title).toEqual('Checkout: Complete!');
    await expect(OverviewPage.completeMessage).toBeExisting();
  })

  it('The User is redirected to Home page after clicking [Backhome] and cart is empty', async () => {
    await $('#back-to-products').click();
    const title = await $('[data-test="title"].title').getText();
    await expect(title).toEqual('Products');
    await expect (await (InventoryPage.cartBadge).isExisting()).toBe(false);
  })
})