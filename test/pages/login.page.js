class LoginPage {

    get usernameField() {
        return $('#user-name');
    }

    get passwordField() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }

    get loginErrorIcon() {
        return $('#user-name + svg[data-icon="times-circle"]');
    }

    get passwordErrorIcon() {
        return $('#password + svg[data-icon="times-circle"]');
    }

    get errorMessage() {
        return $('.error-message-container');
    }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    async loginUser(username, password) {
        await this.usernameField.waitForDisplayed({ timeout: 5000 });
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }

    async getErrorIconColor(element) {
        const colorProperty = await element.getCSSProperty('color');
        return colorProperty.value;
    }

    async getErrorMessageText() {
        return this.errorMessage.getText();
    }

    async checkEmptyFields() {
        await expect(this.usernameField).toHaveValue('');
        await expect(this.passwordField).toHaveValue('');
    }
}

module.exports = new LoginPage();
