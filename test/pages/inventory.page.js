class InventoryPage {

    get burgerButton() {
        return $('#react-burger-menu-btn');
    }

    get logoutLink() {
        return $('#logout_sidebar_link');
    }

    get menuContainer() {
        return $('.bm-item-list');
    }

    get menuItems() {
        return $$('.bm-item-list a.bm-item');
    }
    
    get addToCartBackpack() {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get removeFromCartBackpack() {
        return $('#remove-sauce-labs-backpack');
    }

    get cartBadge() {
        return $('[data-test="shopping-cart-badge"]');
    }

    get cartLink() {
        return $('[data-test="shopping-cart-link"].shopping_cart_link');
    }

    get sortDropdown() {
        return $('select[data-test="product-sort-container"]');
    }
    
    get priceElements() {
        return $$('div.inventory_item_price[data-test="inventory-item-price"]');
    }

    get productElements() {
        return $$('div.inventory_item_name');
    } 
    
    get pageTitle() {
        return $('[data-test="title"].title');
    }

    async open() {
        await browser.url('https://www.saucedemo.com/inventory.html');
    }

    async clickOnBurgerButton() {
        await this.burgerButton.waitForDisplayed({ timeout: 5000 });
        await this.burgerButton.click();
    }

    async clickOnLogout() {
        await this.logoutLink.click();
    }

    async clickOnCartLink() {
        await this.cartLink.waitForDisplayed();
        await this.cartLink.click();
    }

    async isMenuDisplayedWithItems(expectedCount) {
        await this.menuContainer.waitForDisplayed({ timeout: 5000 });
        const items = await this.menuItems;
        return items.length === expectedCount;
    }
        
    async logoutAndCheckUrl() {
        await this.clickOnBurgerButton();
        await this.clickOnLogout();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    }

    async clickAddToCartBackpack() {
        await this.addToCartBackpack.waitForDisplayed();
        await this.addToCartBackpack.click();
    }

    async clickRemoveFromCartBackpack() {
        await this.removeFromCartBackpack.click();
    }

    async assertBadgeText(expectedText) { 
        await this.cartBadge.waitForDisplayed();
        const badgeText = await this.cartBadge.getText();
        await expect(badgeText).toEqual(expectedText);
    }

    async assertNoCartBadge() {
        await expect (await (this.cartBadge).isExisting()).toBe(false);
    }

    async selectSortOption(sortValue) {
        await this.sortDropdown.selectByAttribute('value', sortValue);
    }

    async assertASCSortingPrices() {
        const prices = [];
        for (let i = 0; i < this.priceElements.length; i++) {
        const priceText = await this.priceElements[i].getText();
        prices.push(parseFloat(priceText.replace('$', '')));
        }
        const isSorted = prices.every((price, index) => index === 0 || price >= prices[index - 1]);
        expect(isSorted).toBe(true); 
    }

    async assertDESCSortingPrices() {
        const prices = [];
        for (let i = 0; i < this.priceElements.length; i++) {
        const priceText = await this.priceElements[i].getText();
        prices.push(parseFloat(priceText.replace('$', '')));
        }
        const isSorted = prices.every((price, index) => index === 0 || price <= prices[index - 1]);
        expect(isSorted).toBe(true);
    }

    async assertAscSortingTitles() {
        const productNames = [];
        for (let i = 0; i < this.productElements.length; i++) {
        const nameText = await this.productElements[i].getText();
        productNames.push(nameText);
    }
        const isSortedAsc = productNames.every((name, index) => index === 0 || name >= productNames[index - 1]);
        expect(isSortedAsc).toBe(true);
    }

    async assertDescSortingTitles() {
        const productNames = [];
        for (let i = 0; i < this.productElements.length; i++) {
        const nameText = await this.productElements[i].getText();
        productNames.push(nameText);
    }
        const isSortedDesc = productNames.every((name, index) => index === 0 || name <= productNames[index - 1]);
        expect(isSortedDesc).toBe(true);
    }

    async checkSocialMediaLink(selector, expectedUrl) {
        const link = $(selector);
        link.waitForDisplayed();
        link.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 5000,
                timeoutMsg: 'No new tab'
            }
        );
        const handles = await browser.getWindowHandles();
        console.log(`Handles: ${handles}`);
        
        if (handles.length < 2) {
        throw new Error('2nd tab not opened');
        }

        await browser.switchToWindow(handles[1]);

        await browser.pause(2000);
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain(expectedUrl);
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);

        console.log(await browser.getTitle());
    }

    async assertTitle(value) {
        const title = await this.pageTitle.getText();
        expect(title).toEqual(value);
    }
}    

module.exports = new InventoryPage();