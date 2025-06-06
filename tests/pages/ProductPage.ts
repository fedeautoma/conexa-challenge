import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {
  // Click "Add to cart" and handle the dialog confirmation
  async addToCart() {
    console.log('Clicking Add to cart button and handling alert');
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.getByRole('link', { name: 'Add to cart' }).click()
    ]);

    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
    await this.page.waitForTimeout(1000);
  }

  // Return the title of the product on the detail page
  async getProductTitle(): Promise<string> {
    console.log('Fetching product title');
    const title = await this.page.locator('.name').textContent();
    return title ?? '';
  }
}