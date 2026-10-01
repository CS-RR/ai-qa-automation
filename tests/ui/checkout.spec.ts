import { expect, test } from '@playwright/test';
import { checkoutTest } from '../../fixtures/checkout.fixture';
import  CheckoutData from '../../data/checkout.json';

checkoutTest('User can add product and complete checkout', async ({ checkoutPage}) => {
  test.setTimeout(60_000);

await checkoutPage.completeCheckout(CheckoutData.validCheckout);

await expect(
  checkoutPage.frame.getByRole('heading', { name: 'Your order is confirmed' })
).toBeVisible();

});