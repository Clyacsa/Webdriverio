const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');
const CheckoutPage = require('../pages/checkout.page');
const OverviewPage = require('../pages/overview.page');

describe('Checkout Tests', () => {
      
  beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.loginUser('standard_user', 'secret_sauce');
  });
    
  it('Should be true URL', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining('inventory'));
    }) 

  it('Should add item to cart when clicked', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.assertBadgeText('1');
    await InventoryPage.clickRemoveFromCartBackpack();
  });
        
  it('The cart page should be displayed after clicking on Cart icon', async () => {
    await InventoryPage.clickOnCartLink();
    await expect(browser).toHaveUrl(expect.stringContaining('cart'));
  })

  it('The added product should be displayed on Card page', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.clickOnCartLink();
    await CartPage.verifyItemInCart('Sauce Labs Backpack');
    await CartPage.clickDeleteBackpackButton();
  })
   
  it('Checkout form should be displayed on Cart page', async () => {
    await InventoryPage.clickOnCartLink();
    await CartPage.clickCheckoutButton();
    await CheckoutPage.assertTitle('Checkout: Your Information');
    await CheckoutPage.assertFields();
  })

  it('All values should be displayed in the filled fields in form', async () => {
    await InventoryPage.clickOnCartLink();
    await CartPage.clickCheckoutButton();    
    await CheckoutPage.fillCheckoutForm('Kateryna', 'Ivanova', '73000');
    await CheckoutPage.assertEnteringValues('Kateryna', 'Ivanova', '73000');
  })

  it('The products with prices should be displayed on overview page after ckicking [Continue]', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.clickOnCartLink();
    await CartPage.clickCheckoutButton();    
    await CheckoutPage.fillCheckoutForm('Kateryna', 'Ivanova', '73000');
    await CheckoutPage.clickContinueButton();
    await CheckoutPage.assertTitle('Checkout: Overview');
    await OverviewPage.assertProducts('Sauce Labs Backpack');
    await OverviewPage.assertTotalPrice();
  })

  it('The User should be redirected to Checkout Complete page and get message', async () => {
    await InventoryPage.clickRemoveFromCartBackpack();
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.clickOnCartLink();
    await CartPage.clickCheckoutButton();    
    await CheckoutPage.fillCheckoutForm('Kateryna', 'Ivanova', '73000');
    await CheckoutPage.clickContinueButton();
    await OverviewPage.clickONFinishButton();
    await CheckoutPage.assertTitle('Checkout: Complete!');
    await OverviewPage.checkComplete();
  })

  it('The User is redirected to Home page after clicking [Backhome] and cart is empty', async () => {
    await InventoryPage.clickAddToCartBackpack();
    await InventoryPage.clickOnCartLink();
    await CartPage.clickCheckoutButton();    
    await CheckoutPage.fillCheckoutForm('Kateryna', 'Ivanova', '73000');
    await CheckoutPage.clickContinueButton();
    await OverviewPage.clickONFinishButton();
    await OverviewPage.clickBackHomeButton();
    await InventoryPage.assertTitle('Products');
    await InventoryPage.assertNoCartBadge();
  })
})