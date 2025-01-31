class CheckoutPage{
    get firstNameField() {
        return $('#first-name');
    }

    get lastNameField() {
        return $('#last-name');
    }

    get postalCodeField() {
        return $('#postal-code');
    }

    get continueButton() {
        return $('#continue');
    }

    async fillCheckoutForm(firstname, lastname, postalcode){
        await this.firstNameField.waitForDisplayed({ timeout: 5000 });
        await this.firstNameField.setValue(firstname);
        await this.lastNameField.setValue(lastname);
        await this.postalCodeField.setValue(postalcode);
    } 
      
    async clickContinueButton() {
        await this.continueButton.click();
    }
}
module.exports = new CheckoutPage()