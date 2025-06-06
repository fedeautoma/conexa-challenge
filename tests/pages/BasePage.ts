import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to a given URL
  async navigate(url: string) {
    console.log(`Navigating to URL: ${url}`);
    await this.page.goto(url);
  }
}