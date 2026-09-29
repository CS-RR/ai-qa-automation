import { Page, FrameLocator, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;
  readonly titleMr: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly birthdate: Locator;
  readonly termsCheckbox: Locator;
  readonly privacyCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly viewAccountButton: Locator;
  readonly yourAccountLink: Locator;
  readonly welcomeHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe[name="framelive"]');

    this.signInLink = this.frame.getByLabel('Sign in');
    this.createAccountLink = this.frame.getByRole('link', { name: 'Create your account' });
    this.titleMr = this.frame.getByRole('radio', { name: 'Mr.' });
    this.firstName = this.frame.getByRole('textbox', { name: 'First name' });
    this.lastName = this.frame.getByRole('textbox', { name: 'Last name' });
    this.email = this.frame.getByRole('textbox', { name: 'Email', exact: true });
    this.password = this.frame.getByRole('textbox', { name: 'Password' });
    this.birthdate = this.frame.getByRole('textbox', { name: 'Birthdate' });
    this.termsCheckbox = this.frame.getByRole('checkbox', { name: /terms/i });
    this.privacyCheckbox = this.frame.getByRole('checkbox', {name: 'Customer data privacy The'});
    this.createAccountButton = this.frame.getByRole('button', { name: 'Create account' });
    this.viewAccountButton = this.frame.getByRole('button', { name: 'View my account' });
    this.yourAccountLink = this.frame.getByRole('link', { name: 'Your account' }).nth(0);
    this.welcomeHeading = this.frame.getByRole('heading', { name: /^Welcome/i });
  }

  async open() {
    await this.page.goto('/');
    await this.page.waitForTimeout(5000);
  }
 
 async registerUser(user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: string;
}) 
{
    await this.signInLink.click();
    await this.createAccountLink.click();
    await this.titleMr.check();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.birthdate.fill(user.birthdate);
    await this.termsCheckbox.check();
    await this.privacyCheckbox.check();
    await this.createAccountButton.click();
  }

  async goToAccountPage() {
  await this.viewAccountButton.click();
  await this.yourAccountLink.click();
}

  async expectRegistrationSuccessful() {
    await expect(this.welcomeHeading).toBeVisible();
  }
}