const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');

describe('Cart Tests', () => {

  beforeEach(async () => { 
    await LoginPage.open();
    await LoginPage.loginUser('standard_user', 'secret_sauce');
});
      
  it('Should be true URL', async () => {
    await browser.url('https://www.saucedemo.com/');
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('Should add item to cart when clicked', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.assertBadgeText('1');
    await InventoryPage.clickRemoveFromCartBackpack();
  });

  it('The Burger Menu should contain 4 options after clicking', async () => {
    await InventoryPage.clickOnBurgerButton();
    await expect(await InventoryPage.isMenuDisplayedWithItems(4)).toBeTruthy();
});

  it('User should be redirected to Login Page after clicking Logout', async () => {
    await InventoryPage.logoutAndCheckUrl();
    await LoginPage.checkEmptyFields();
  })
    
  it('User should be logged in, the products and cart should be displayed', async () => {
    const title = await $('[data-test="title"]').getText();
    await expect(title).toEqual('Products');
    await expect(InventoryPage.cartLink).toBeExisting();
  })
    
  it('The cart page should be displayed after clicking on Cart icon', async () => {
    await InventoryPage.clickOnCartLink();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The added product should be displayed on Card page', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.clickOnCartLink();
    await CartPage.verifyItemInCart('Sauce Labs Backpack');
  })
})