const InventoryPage = require('../pages/inventory.page');
const LoginPage = require('../pages/login.page');

describe('Sort Products Tests', () => {
    
  it('Should be true URL', async () => {
    await browser.url('https://www.saucedemo.com/');
    await LoginPage.loginUser('standard_user', 'secret_sauce');
    await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
  }) 

  it('Should sort products by Price (low to high)', async () => {
    await InventoryPage.sortDropdown.selectByAttribute('value', 'lohi');
    const prices = [];
    for (let i = 0; i < InventoryPage.priceElements.length; i++) {
      const priceText = await InventoryPage.priceElements[i].getText();
      prices.push(parseFloat(priceText.replace('$', '')));
    }
    const isSorted = prices.every((price, index) => index === 0 || price >= prices[index - 1]);
    expect(isSorted).toBe(true);
  });

  it('Should sort products by Price (high to low)', async () => {
    await InventoryPage.sortDropdown.selectByAttribute('value', 'hilo');
    const prices = [];
    for (let i = 0; i < InventoryPage.priceElements.length; i++) {
      const priceText = await InventoryPage.priceElements[i].getText();
      prices.push(parseFloat(priceText.replace('$', '')));
    }
    const isSorted = prices.every((price, index) => index === 0 || price <= prices[index - 1]);
    expect(isSorted).toBe(true);
  });

  it('Should sort products by title (A to Z)', async () => {
    await InventoryPage.sortDropdown.selectByAttribute('value', 'az');
    const productNames = [];
    for (let i = 0; i < InventoryPage.productElements.length; i++) {
      const nameText = await InventoryPage.productElements[i].getText();
      productNames.push(nameText);
    }
    const isSortedAsc = productNames.every((name, index) => index === 0 || name >= productNames[index - 1]);
    expect(isSortedAsc).toBe(true);
  })

  it('Should sort products by title (A to Z)', async () => {
    await InventoryPage.sortDropdown.selectByAttribute('value', 'az');
    const productNames = [];
    for (let i = 0; i < InventoryPage.productElements.length; i++) {
      const nameText = await InventoryPage.productElements[i].getText();
      productNames.push(nameText);
    }
    const isSortedDesc = productNames.every((name, index) => index === 0 || name <= productNames[index - 1]);
    expect(isSortedDesc).toBe(true);
  })
})