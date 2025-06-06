// ✅ AddToCartValidation.spec.ts actualizado
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignUpLoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Add a random product to the cart and validate it', async ({ page }) => {
  
  // Page objects
  const home = new HomePage(page);
  const auth = new SignupLoginPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  // Generate a unique user for each test run 
  const username = `user${Date.now()}`;
  const password = 'Test123!';

  // Navigate to the homepage
  await home.navigate('https://www.demoblaze.com/');

  // Sign up with the new user and handle alert
  await home.clickSignup();
  await auth.signup(username, password);
  await auth.acceptAlert('Sign up successful');

  // Login with the new credentials
  await home.clickLogin();
  await auth.login(username, password);
  await home.waitForLogin(username);

  // Locate all products from the main listing
  const products = await page.locator('#tbodyid .card-title a');
  const count = await products.count();
  const randomIndex = Math.floor(Math.random() * count);
  const selectedProduct = products.nth(randomIndex);
  const productName = await selectedProduct.textContent();

  console.log(`Selected product: ${productName}`);

  // Click on the product to go to the product detail page
  await selectedProduct.click();

  // Add product to cart and accept alert
  await product.addToCart();

  // Navigate to the cart page
  await cart.goToCart();

  // Get list of product names in cart
  const items = await cart.getProductNames();

  // Debugging output
  console.log('Expected product:', productName);
  console.log('Products found in cart:', items);

  // Assert the product is in the cart
  expect(items.map(p => p.trim().toLowerCase()))
    .toContain(productName?.trim().toLowerCase());
});

