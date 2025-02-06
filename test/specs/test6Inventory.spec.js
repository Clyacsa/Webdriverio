const InventoryPage = require('../pages/inventory.page');
const LoginPage = require('../pages/login.page');

describe('Sort Products Tests', () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.loginUser('standard_user', 'secret_sauce');
  });

  it('Should be true URL', async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('Should sort products by Price (low to high)', async () => {
    await InventoryPage.selectSortOption('lohi');
    await InventoryPage.assertASCSortingPrices();
  });

  it('Should sort products by Price (high to low)', async () => {
    await InventoryPage.selectSortOption('hilo');
    await InventoryPage.assertDESCSortingPrices();
  });

  it('Should sort products by title (A to Z)', async () => {
    await InventoryPage.selectSortOption('az');
    await InventoryPage.assertAscSortingTitles();
  })

  it('Should sort products by title (A to Z)', async () => {
    await InventoryPage.selectSortOption('az');
    await InventoryPage.assertDescSortingTitles();
  })
})