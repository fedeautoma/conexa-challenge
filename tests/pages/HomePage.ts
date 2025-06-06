import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Click on the "Sign up"
  async clickSignup() {
    console.log('Clicking Sign up link');
    await this.page.getByRole('link', { name: 'Sign up' }).click();
  }

  // Click on the "Log in" link
  async clickLogin() {
    console.log('Clicking Log in link');
    await this.page.getByRole('link', { name: 'Log in' }).click();
  }

  // Wait for login confirmation by username
  async waitForLogin(userName: string) {
    console.log(`Waiting for login confirmation for user: ${userName}`);
    await this.page.waitForSelector(`#nameofuser:has-text("Welcome ${userName}")`);
  }

  // Return the displayed logged-in username
  async getLoggedUserName(): Promise<string | null> {
    console.log('Getting logged-in username from header');
    return await this.page.locator('#nameofuser').textContent();
  }
}