const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');

describe('Cart Tests', () => {
      
  it('Should be true URL', async () => {
    await browser.url('https://www.saucedemo.com/');
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('Should add item to cart when clicked', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.assertBadgeText('1');
  });

  it('The Burger Menu should contain 4 options after clicking', async () => {
    await InventoryPage.clickOnBurgerButton();
    const menuContainer = await $('.bm-item-list');
    await menuContainer.waitForDisplayed({ timeout: 5000 });
    const menuItems = await $$('.bm-item-list a.bm-item');
    await expect(menuItems).toHaveLength(4);
  }) 

  it('User should be redirected to Login Page after clicking Logout', async () => {
    await InventoryPage.clickOnLogout();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await expect(LoginPage.usernameField).toHaveValue('');
    await expect(LoginPage.passwordField).toHaveValue('');
  })
    
  it('User should be logged in, the products and cart should be displayed', async () => {
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    const title = await $('[data-test="title"]').getText();
    await expect(title).toEqual('Products');
    await expect(InventoryPage.cartLink).toBeExisting();
  })
    
  it('The cart page should be displayed after clicking on Cart icon', async () => {
    await InventoryPage.clickOnCartLink();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The added product should be displayed on Card page', async () => {
    await CartPage.verifyItemInCart('Sauce Labs Backpack');
  })
})