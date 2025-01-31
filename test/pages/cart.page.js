class CartPage{
    get cartItemName() {
        return $('[data-test="inventory-item-name"]');
    }

    get checkoutButton() {
        return $('#checkout');
    }

    async verifyItemInCart(expectedItemName) {
        await this.cartItemName.waitForDisplayed({ timeout: 5000 });
        await expect(this.cartItemName).toHaveText(expectedItemName);
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}
module.exports = new CartPage()