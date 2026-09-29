import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://demo.prestashop.com/#/en/front');
    await this.page.waitForTimeout(10000);
  }
}