import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class SignupLoginPage extends BasePage {
  // Fill sign-up form and submit
  async signup(username: string, password: string) {
    console.log(`Signing up with username: ${username}`);
    await this.page.locator('#sign-username').fill(username);
    await this.page.locator('#sign-password').fill(password);
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }

  // Fill login form and submit
  async login(username: string, password: string) {
    console.log(`Logging in with username: ${username}`);
    await this.page.locator('#loginusername').fill(username);
    await this.page.locator('#loginpassword').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  // Handle alert and optionally verify message
  async acceptAlert(expectedMessage?: string) {
    console.log('Waiting for alert and accepting');
    this.page.once('dialog', async dialog => {
      if (expectedMessage) {
        expect(dialog.message()).toContain(expectedMessage);
      }
      await dialog.accept();
    });
  }
}