const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

describe('Footer Tests', () => {
  beforeEach(async () => {
      await LoginPage.open();
      await LoginPage.loginUser('standard_user', 'secret_sauce');
    });
  
  it('Should be true URL', async () => {
      await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('Twitter should be opened on the new tab', async () => {
    await InventoryPage.checkSocialMediaLink('[data-test="social-twitter"]', 'https://x.com/saucelabs');
  })

  it('Facebook should be opened on the new tab', async () => {
    await InventoryPage.checkSocialMediaLink('[data-test="social-facebook"]', 'https://www.facebook.com/saucelabs');
  })

  it('LinkedIn should be opened on the new tab', async () => {
    await InventoryPage.checkSocialMediaLink('[data-test="social-linkedin"]', 'https://www.linkedin.com/company/sauce-labs/');
  })
})