import { test as base } from '@playwright/test';
import { ProductPage } from "../pages/ProductPage";

export const productTest = base.extend<{ productPage: ProductPage }>({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await productPage.open(); 
    await use(productPage);
  },
});