class CartPage{
    get cartItemName() {
        return $('[data-test="inventory-item-name"]');
    }

    get checkoutButton() {
        return $('#checkout');
    }

    get deleteBackpackFromCart() {
        return $('#remove-sauce-labs-backpack')
    }

    get errorMessageCont() {
        return $('.error-message-container')
    }

    async open() { 
        await browser.url('https://www.saucedemo.com/cart.html');
    }

    async verifyItemInCart(expectedItemName) {
        await this.cartItemName.waitForDisplayed({ timeout: 5000 });
        await expect(this.cartItemName).toHaveText(expectedItemName);
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async clickDeleteBackpackButton() {
        await this.deleteBackpackFromCart.click();
    }

    async assertEmptyCart() {
        await expect (await (this.cartItemName).isExisting()).toBe(false);
    }

    async assertErrorMessage(value) {
        const errorMessage = await this.errorMessageCont.getText();
        expect(await errorMessage).toEqual(value);
    }
}
module.exports = new CartPage()

