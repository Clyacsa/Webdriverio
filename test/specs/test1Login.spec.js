const LoginPage = require('../pages/login.page');

describe('Login Tests', () => {
    
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
  });
 
  it('Should login with valid data and check the page title', async () => {

    await LoginPage.loginUser('standard_user', 'secret_sauce');
    const title = await $('[data-test="title"].title').getText();
    expect(title).toEqual('Products');
    })

  it('Should login with valid data and display cart link', async () => {
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    const cartLink = await $('[data-test="shopping-cart-link"].shopping_cart_link').isExisting();
    expect(cartLink).toBe(true);
  })
})