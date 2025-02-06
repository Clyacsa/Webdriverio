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

    get pageTitle() {
        return $('[data-test="title"].title');
    }

    async fillCheckoutForm(firstname, lastname, postalcode){
        await this.firstNameField.waitForDisplayed({ timeout: 5000 });
        await this.firstNameField.setValue(firstname);
        await this.lastNameField.setValue(lastname);
        await this.postalCodeField.setValue(postalcode);
    } 
    
    async assertEnteringValues(firstname, lastname, postalcode){
        await expect(this.firstNameField).toHaveValue('Kateryna', { ignoreCase: true });
        await expect(this.lastNameField).toHaveValue('Ivanova', { ignoreCase: true });
        await expect(this.postalCodeField).toHaveValue('73000', { ignoreCase: true });
    } 
    
    async clickContinueButton() {
        await this.continueButton.click();
    }

    async assertTitle(value) {
        const title = await this.pageTitle.getText();
        expect(title).toEqual(value);
    }

    async assertFields() {
        await expect(this.firstNameField).toBeExisting();
        await expect(this.lastNameField).toBeExisting();
        await expect(this.postalCodeField).toBeExisting();
    }
}
module.exports = new CheckoutPage()