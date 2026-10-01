import { expect, test } from '@playwright/test';
import { e2eTest } from '../../fixtures/e2e.fixture';
import  CheckoutData from '../../data/checkout.json';
import userData from '../../data/user.json';

e2eTest('User can register, add products, and complete checkout', async ({ registerPage, productPage, checkoutPage }) => {
  test.setTimeout(60_000);

//await registerPage.open();
await registerPage.registerUser(userData.validUser);
await registerPage.goToAccountPage();
await registerPage.expectRegistrationSuccessful();

await productPage.open();

await checkoutPage.completeCheckout(CheckoutData.validCheckout);

await expect(
  checkoutPage.frame.getByRole('heading', { name: 'Your order is confirmed' })
).toBeVisible();
});
