const LoginPage = require('../pages/login.page');

describe('Login Tests', () => {

    beforeEach(async () => {
        await LoginPage.open();
    });

    it('Should not be logged in with valid login data and wrong password and Error icons are displayed', async () => {
        await LoginPage.loginUser('standard_user', 'wrongData');

        await expect(LoginPage.loginErrorIcon).toExist();
        await expect(LoginPage.passwordErrorIcon).toExist();

        const iconColorUsername = await LoginPage.getErrorIconColor(LoginPage.loginErrorIcon);
        console.log(iconColorUsername);
        await expect(iconColorUsername).toEqual('rgba(226,35,26,1)');

        const iconColorPassword = await LoginPage.getErrorIconColor(LoginPage.passwordErrorIcon);
        console.log(iconColorPassword);
        await expect(iconColorPassword).toEqual('rgba(226,35,26,1)');
    });

    it('Should not be logged in with valid login data and wrong password and Error message should be displayed', async () => {
        await LoginPage.loginUser('standard_user', 'wrongData');

        const errorMessage = await LoginPage.getErrorMessageText();
        expect(errorMessage).toEqual('Epic sadface: Username and password do not match any user in this service');
    });
});