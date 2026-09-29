import { test as base } from '@playwright/test';
import { RegisterPage } from "../pages/RegisterPage";

export const registerTest = base.extend<{ registerPage: RegisterPage }>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open(); 
    await use(registerPage);
  },
});