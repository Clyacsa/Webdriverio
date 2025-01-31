class InventoryPage{

    get burgerButton(){
        return $('#react-burger-menu-btn');
    }
    get logoutLink(){
        return $('#logout_sidebar_link');
    }
    get addToCartBackpack(){
        return $('[data-test="add-to-cart-sauce-labs-backpack"]');
    }
    get cartBadge(){
        return $('[data-test="shopping-cart-badge"]');
    }
    get badgeText() {
        return this.cartBadge.getText();
    }
    get cartLink(){
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
                  
    async clickOnBurgerButton(){
        await this.burgerButton.waitForDisplayed({ timeout: 5000 });
        await this.burgerButton.scrollIntoView();
        await this.burgerButton.click();
    }

    async clickOnLogout(){
        await this.logoutLink.click();
    } 

    async clickAddToCartBackpack(){
        await this.addToCartBackpack.click();
    }
    
    async assertBadgeText(value) {
        const badgeText = await this.badgeText; 
        await expect(badgeText).toEqual(value);
    }

    async clickOnCartLink(){
        await this.cartLink.click();
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
}

module.exports = new InventoryPage()