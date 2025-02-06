class OverviewPage{

    get ItemName() {
        return $('[data-test="inventory-item-name"]');
    }

    get finishButton() {
        return $('#finish');
    }

    get completeMessage() {
        return $('[data-test="complete-header"]');
    }

    get totalPrice() {
        return $('[data-test="subtotal-label"]');
    }

    get backhomeButton() {
        return $('#back-to-products');
    }

    async clickONFinishButton() {
        await this.finishButton.click();
    }  

    async assertProducts(value) {
        await expect(this.ItemName).toHaveText(value);
    }

    async assertTotalPrice() {
        const TotalPrice = await this.totalPrice.getText();
        expect(TotalPrice).toEqual('Item total: $29.99');
    }

    async checkComplete() {
        await expect(this.completeMessage).toBeExisting();
    }

    async clickBackHomeButton() {
        await this.backhomeButton.click();
    }
}
module.exports = new OverviewPage()