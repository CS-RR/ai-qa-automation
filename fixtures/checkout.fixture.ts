import { test as base } from '@playwright/test';
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from '../pages/CheckoutPage';

export const checkoutTest = base.extend<{ checkoutPage: CheckoutPage }>({
  checkoutPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await productPage.open();

    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});
