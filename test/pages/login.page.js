class LoginPage{

    get usernameField(){
        return $('#user-name');
    }
    get passwordField(){
        return $('#password');
    }
    get loginButton(){
        return $('#login-button');
    }
        
    async loginUser(username, password){
        await this.usernameField.waitForDisplayed({ timeout: 5000 });
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }
}
module.exports = new LoginPage()
