const LoginPage = require('../pages/login.page');

describe('Login Tests', () => {
    
  beforeEach(async () => {
    await LoginPage.open();
  });
 
  it('Should login with valid data and check the page title', async () => {

    await LoginPage.loginUser('standard_user', 'secret_sauce');
    const title = await $('[data-test="title"].title').getText();
    expect(title).toEqual('Products');
    })

  it('Should login with valid data and display cart link', async () => {
    await LoginPage.loginUser('standard_user', 'secret_sauce');
        const cartLinkDisplayed = await LoginPage.isCartLinkDisplayed();
        expect(cartLinkDisplayed).toBe(true);
  })
})