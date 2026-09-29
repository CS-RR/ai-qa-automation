import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export const e2eTest = base.extend<{
  registerPage: RegisterPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
}>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await use(registerPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});
