import { Page, FrameLocator, Locator, expect } from '@playwright/test';

export class ProductPage {

  readonly page: Page;
  readonly frame: FrameLocator;
  readonly featuredProductsLink: Locator;
  readonly ProductCard: Locator;
  readonly QuickViewButton: Locator;
  readonly SelectColorButton: Locator;
  readonly AddToCartButton: Locator;
  readonly ContinueShoppingButton: Locator;
  readonly ViewBearCushion: Locator;
  readonly PlusOneCushionButton: Locator;
  readonly AddBearCushionButton: Locator;
  readonly CartButton: Locator;
  readonly ProceedToCheckoutButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe[name="framelive"]');

    this.featuredProductsLink = this.frame.getByRole('link', { name: 'All featured products' });
    this.ProductCard = this.frame.locator('xpath=//*[@id="js-product-list"]/div[1]/article[1]');
    this.QuickViewButton = this.frame.locator('xpath=//*[@id="js-product-list"]/div[1]/article[1]/div/div[1]/button[1]');
    this.SelectColorButton = this.frame.locator('xpath=//*[@id="quickview-modal-1-1"]//*[@id="label_2_11_1"]');
    this.AddToCartButton = this.frame.locator('xpath=//*[@id="quickview-modal-1-1"]/div/div//*[@id="add-to-cart-or-refresh"]/div[2]/div[2]/div[2]/button');
    
    this.ContinueShoppingButton = this.frame.getByRole('button', { name: 'Continue shopping' });
    
    this.ViewBearCushion = this.frame.locator('xpath=//a[contains(text(), "Brown bear cushion")]');
    this.PlusOneCushionButton = this.frame.locator('xpath=//*[@id="increment_button_10"]');
    this.AddBearCushionButton = this.frame.locator('xpath=//button[@aria-label="Add to cart Brown bear cushion"]');
    
    this.CartButton = this.frame.locator('xpath=//*[@id="_desktop_ps_shoppingcart"]/div/div/a/span[1]');
    this.ProceedToCheckoutButton = this.frame.getByRole('link', { name: 'Proceed to checkout' });

  }

async safeClick(locator: Locator) {
  await expect(locator).toBeVisible();   
  await locator.click();                 
}

  async open() {

    await this.page.goto('/');
    await this.page.waitForTimeout(5000);
    await this.featuredProductsLink.click();
    
    await this.ProductCard.hover();
    await this.QuickViewButton.click();
    await this.SelectColorButton.click();
    await this.AddToCartButton.click();
    await this.ContinueShoppingButton.click();
    await this.CartButton.click();
    await this.ProceedToCheckoutButton.click();

    //For 2e2 flow:
    /*await this.PlusOneCushionButton.click();
    await this.AddBearCushionButton.click();
    await this.ContinueShoppingButton.click();
    await this.CartButton.click();
    await this.ProceedToCheckoutButton.click();*/

  }
}