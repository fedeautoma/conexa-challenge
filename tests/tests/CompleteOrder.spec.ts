import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignUpLoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Complete a purchase and validate confirmation message', async ({ page }) => {
  // Instantiate page objects
  const home = new HomePage(page);
  const auth = new SignupLoginPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  // Static test user credentials
  const username = 'QA1223';
  const password = 'fede';

  console.log(`Using existing user for test: ${username}`);

  // Navigate to homepage
  await home.navigate('https://www.demoblaze.com/');
  console.log('Navigated to homepage');

  // Login with static credentials
  await home.clickLogin();
  console.log('Login modal opened');

  await auth.login(username, password);
  console.log('Login submitted');

  await home.waitForLogin(username);
  console.log(`Login confirmed for user: ${username}`);

  // Select first product from home page
  const firstProduct = await page.locator('.card-title a').first();
  const productName = await firstProduct.textContent();
  console.log(`Selected product: ${productName}`);
  await firstProduct.click();
  console.log('Navigated to product detail page');

  // Add product to cart with alert handling
  await product.addToCart();
  console.log('Product added to cart');

  // Navigate to cart
  await cart.goToCart();
  console.log('Navigated to cart page');

  // Start placing the order
  await cart.placeOrder();
  console.log('Place Order modal opened');

  // Fill in order details
  await cart.fillOrderForm({
    name: 'Juan QA',
    country: 'Argentina',
    city: 'Buenos Aires',
    creditCard: '1234-5678-9012-3456',
    month: '06',
    year: '2025',
  });
  console.log('Order form completed');

  // Submit the order
  await cart.submitOrder();
  console.log('Order submitted');

  // Retrieve and log confirmation message
  const confirmation = await cart.getConfirmationMessage();
  console.log('Confirmation message:', confirmation);

  // Assert it contains the success text
  expect(confirmation).toContain('Thank you for your purchase!');
  console.log('Purchase confirmation validated');

  // Confirm to close modal
  await cart.confirmPurchase();
  console.log('Confirmation modal closed');
});

