import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignUpLoginPage';

test('Create a new user and log in successfully', async ({ page }) => {
  // Instantiate page objects
  const home = new HomePage(page);
  const auth = new SignupLoginPage(page);

  // Generate a unique username for this test run
  const username = `user${Date.now()}`;
  const password = 'Test123!';

  console.log(`Generated test user: ${username}`);

  // Navigate to homepage
  await home.navigate('https://www.demoblaze.com/');

  // Trigger the sign-up process
  await home.clickSignup();
  await auth.signup(username, password);
  await auth.acceptAlert('Sign up successful');

  // Perform login
  await home.clickLogin();
  await auth.login(username, password);

  // Validate successful login by checking for username visibility
  await home.waitForLogin(username);
  const loggedUser = await home.getLoggedUserName();

  console.log(`Logged in as: ${loggedUser}`);

  expect(loggedUser).toContain(`Welcome ${username}`);
});
