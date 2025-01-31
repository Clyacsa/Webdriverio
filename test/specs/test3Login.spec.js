const LoginPage = require('../pages/login.page');

describe('Login Tests', () => {
    
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
  });
 
  it('Should not be logged in with not registered login and valid password and Error icons are displayed', async () => {
    await LoginPage.loginUser('standarD_user', 'secret_sauce');
        
    const loginErrorIcon = await $('#user-name + svg[data-icon="times-circle"]');
    const passwordErrorIcon = await $('#password + svg[data-icon="times-circle"]');
    await expect(loginErrorIcon).toExist; 
    await expect(passwordErrorIcon).toExist;
        
    const iconColorUsername = await loginErrorIcon.getCSSProperty('color');
    console.log(iconColorUsername.value);
    await expect(iconColorUsername.value).toEqual('rgba(226,35,26,1)');

    const iconColorPassword = await passwordErrorIcon.getCSSProperty('color');
    console.log(iconColorPassword.value);
    await expect(iconColorPassword.value).toEqual('rgba(226,35,26,1)');
  })

  it('Should not be logged in with not registered login and valid password and wrong password and Error message should be displayed', async () => {
    await LoginPage.loginUser('standarD_user', 'secret_sauce');
        
    const errorMessage = await $('.error-message-container');
    expect(await errorMessage.getText()).toEqual('Epic sadface: Username and password do not match any user in this service');
  });
})