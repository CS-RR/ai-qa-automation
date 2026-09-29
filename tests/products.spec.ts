import { expect } from '@playwright/test';
import { productTest } from '../fixtures/product.fixture';

productTest('User can add products to the cart', async ({ productPage }) => {
  
  await expect(productPage.frame.getByRole('heading', { name: 'Personal Information' })).toBeVisible();
});
