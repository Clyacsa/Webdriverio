const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

describe('InventoryExplore Tests', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.loginUser('standard_user', 'secret_sauce');
        await InventoryPage.openInventoryPage();
    });

    it('Should be true URL', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
    });

    it('The Burger Menu should contain 4 options after clicking', async () => {
        await InventoryPage.clickOnBurgerButton();
        const menuHasExpectedItems = await InventoryPage.isMenuDisplayedWithItems(4);
        expect(menuHasExpectedItems).toBe(true);
    });

    it('User should be redirected to Login Page after clicking Logout', async () => {
        await InventoryPage.logoutAndCheckLoginFields(LoginPage);
    });
});