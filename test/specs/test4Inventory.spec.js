const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

describe('InventoryExplore Tests', () => {
    
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    await browser.url('https://www.saucedemo.com/inventory.html');
  });

  it('Should be true URL', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('The Burger Menu should contain 4 options after clicking', async () => {
    await InventoryPage.clickOnBurgerButton();
    const menuContainer = await $('.bm-item-list');
    await menuContainer.waitForDisplayed({ timeout: 5000 });
    const menuItems = await $$('.bm-item-list a.bm-item');
    await expect(menuItems).toHaveLength(4);
  }) 

  it('User should be redirected to Login Page after clicking Logout', async () => {
    await InventoryPage.clickOnBurgerButton();
    await InventoryPage.clickOnLogout();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await expect(LoginPage.usernameField).toHaveValue('');
    await expect(LoginPage.passwordField).toHaveValue('');
  })

})  