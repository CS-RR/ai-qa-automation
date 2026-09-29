import { expect } from '@playwright/test';
import { registerTest } from '../fixtures/register.fixture';
import userData from '../data/user.json';

registerTest('User can register a new account', async ({ registerPage }) => {

  await registerPage.open();
  await registerPage.registerUser(userData.validUser);

  // For individual test
   await registerPage.goToAccountPage();
   await expect(registerPage.welcomeHeading).toBeVisible();
});