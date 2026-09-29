import { Page, FrameLocator, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly titleMr: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly termsCheckbox: Locator;
  readonly privacyCheckbox: Locator;
  readonly continueButton: Locator;
  readonly address: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly clickAndCollectOption: Locator;
  readonly continueToPaymentButton: Locator;
  readonly cashOnDeliveryOption: Locator;
  readonly paymentTermsCheckbox: Locator;
  readonly placeOrderButton: Locator;
  readonly featuredProductsLink: Locator;
  readonly AddBearCushionButton: Locator;
  readonly ContinueShoppingButton: Locator;
  readonly CartButton: Locator;
  readonly ProceedToCheckoutButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe[name="framelive"]');
    this.titleMr = this.frame.getByRole('radio', { name: 'Mr.' });
    this.firstName = this.frame.getByRole('textbox', { name: 'First name' });
    this.lastName = this.frame.getByRole('textbox', { name: 'Last name' });
    this.email = this.frame.getByRole('textbox', { name: 'Email', exact: true });
    this.termsCheckbox = this.frame.getByRole('checkbox', { name: 'I agree to the terms and' });
    this.privacyCheckbox = this.frame.getByRole('checkbox', { name: 'Customer data privacy The' });
    this.continueButton = this.frame.getByRole('button', { name: 'Continue' });
    this.address = this.frame.getByRole('textbox', { name: 'Address', exact: true });
    this.postalCode = this.frame.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.city = this.frame.getByRole('textbox', { name: 'City' });
    this.clickAndCollectOption = this.frame.getByRole('radio', { name: 'Click and collect Pick up in-' });
    this.continueToPaymentButton = this.frame.getByRole('button', { name: 'Continue to Payment' });
    this.cashOnDeliveryOption = this.frame.locator('xpath=//*[@id="payment-option-2"]');
    this.paymentTermsCheckbox = this.frame.locator('xpath=//*[@id="conditions_to_approve[terms-and-conditions]"]');
    this.placeOrderButton = this.frame.locator('xpath=//*[@id="payment-confirmation"]');
    this.featuredProductsLink = this.frame.getByRole('link', { name: 'All featured products' });
    this.AddBearCushionButton = this.frame.locator('xpath=//button[@aria-label="Add to cart Brown bear cushion"]');
    this.ContinueShoppingButton = this.frame.getByRole('button', { name: 'Continue shopping' });
    this.CartButton = this.frame.locator('xpath=//*[@id="_desktop_ps_shoppingcart"]/div/div/a/span[1]');
    this.ProceedToCheckoutButton = this.frame.getByRole('link', { name: 'Proceed to checkout' });
  }

  async open() {
    await this.page.goto('/');
    await this.page.waitForTimeout(5000);
  }

  async completeCheckout(checkout: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    postalCode: string;
    city: string
  })
  {
    await expect(this.titleMr.or(this.address).first()).toBeVisible();
    if (await this.titleMr.isVisible()) {
      await this.titleMr.check();
      await this.firstName.fill(checkout.firstName);
      await this.lastName.fill(checkout.lastName);
      await this.email.fill(checkout.email);
      await this.termsCheckbox.check();
      await this.privacyCheckbox.check();
      await this.continueButton.click();
    }
    await expect(this.address).toBeVisible();
    await this.address.fill(checkout.address);
    await this.postalCode.fill(checkout.postalCode);
    await this.city.fill(checkout.city);

    await this.continueButton.click();

    await this.clickAndCollectOption.check();
    await this.continueToPaymentButton.click();

    await this.cashOnDeliveryOption.check();
    await this.paymentTermsCheckbox.check();

    await this.placeOrderButton.click();
  }  
}