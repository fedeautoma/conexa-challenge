import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
  // Navigate to the cart page
  async goToCart() {
    console.log('Navigating to cart via navbar');
    await this.page.locator('#navbarExample').getByRole('link', { name: 'Cart' }).first().click();
    await this.page.waitForURL('**/cart.html');
  }

  // Extract all product names from the cart table
  async getProductNames(): Promise<string[]> {
    console.log('Fetching product names from cart table');
    await this.page.waitForSelector('.success td:nth-child(2)', { timeout: 5000 });
    return this.page.locator('.success td:nth-child(2)').allTextContents();
  }

  // Trigger the Place Order modal
  async placeOrder() {
    console.log('Clicking Place Order button');
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }

  // Fill in the order form with provided data
  async fillOrderForm(data: {
    name: string;
    country: string;
    city: string;
    creditCard: string;
    month: string;
    year: string;
  }) {
    console.log('Filling out order form');
    await this.page.locator('#name').fill(data.name);
    await this.page.locator('#country').fill(data.country);
    await this.page.locator('#city').fill(data.city);
    await this.page.locator('#card').fill(data.creditCard);
    await this.page.locator('#month').fill(data.month);
    await this.page.locator('#year').fill(data.year);
  }

  // Submit the order form
  async submitOrder() {
    console.log('Submitting the order form');
    await this.page.getByRole('button', { name: 'Purchase' }).click();
  }

  // Retrieve confirmation message text
  async getConfirmationMessage(): Promise<string> {
    console.log('Retrieving confirmation message');
    return (await this.page.locator('.sweet-alert').textContent()) ?? '';
  }

  // Click OK to confirm order and close modal
  async confirmPurchase() {
    console.log('Clicking OK to close confirmation modal');
    await this.page.getByRole('button', { name: 'OK' }).click();
  }
}
