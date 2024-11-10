import { test, expect } from '@playwright/test';

// Test data
const validUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'Test123!@#'
};

const invalidEmails = [
  'invalid-email',
  'test@',
  '@example.com',
  'test@.com',
];

const invalidPasswords = [
  'short1!',           // Too short
  'nouppercase123!',   // No uppercase
  'NOSPECIAL123',      // No special character
  'NoNumber!'          // No number
];

// Helper functions
async function fillSignInForm(page, email, password) {
  await page.fill('#email', email);
  await page.fill('#password', password);
}

async function fillSignUpForm(page, name, email, password) {
  await page.fill('#name', name);
  await page.fill('#email', email);
  await page.fill('#password', password);
}

// Sign In Tests
test.describe('Sign In Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    const emailError = page.locator('text=Email is required');
    const passwordError = page.locator('text=Password is required');
    
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    for (const invalidEmail of invalidEmails) {
      await fillSignInForm(page, invalidEmail, validUser.password);
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Invalid email address')).toBeVisible();
    }
  });

  test('should validate password requirements', async ({ page }) => {
    for (const invalidPassword of invalidPasswords) {
      await fillSignInForm(page, validUser.email, invalidPassword);
      await page.click('button[type="submit"]');
      await expect(page.locator('text=/Password must contain|Password must be/')).toBeVisible();
    }
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.click('text=forgot password');
    await expect(page).toHaveURL('/forgot-password');
  });

  test('should navigate to sign up page', async ({ page }) => {
    await page.click('text=Sign Up');
    await expect(page).toHaveURL('/signup');
  });

  test('should handle successful login for regular user', async ({ page }) => {
    // Mock successful login response
    await page.route('**/api/users/login', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ...validUser, isAdmin: false })
      });
    });
    
    await fillSignInForm(page, validUser.email, validUser.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/events');
  });

  test('should handle successful login for admin user', async ({ page }) => {
    // Mock successful login response
    await page.route('**/api/users/login', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ...validUser, isAdmin: true })
      });
    });
    
    await fillSignInForm(page, validUser.email, validUser.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin-dashboard');
  });

  test('should handle login error', async ({ page }) => {
    // Mock failed login response
    await page.route('**/api/users/login', async route => {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Invalid credentials' })
      });
    });
    
    await fillSignInForm(page, validUser.email, validUser.password);
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toBeVisible();
  });
});

// Sign Up Tests
test.describe('Sign Up Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    const nameError = page.locator('text=Name is required');
    const emailError = page.locator('text=Email is required');
    const passwordError = page.locator('text=Password is required');
    
    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    for (const invalidEmail of invalidEmails) {
      await fillSignUpForm(page, validUser.name, invalidEmail, validUser.password);
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Invalid email address')).toBeVisible();
    }
  });

  test('should validate password requirements', async ({ page }) => {
    for (const invalidPassword of invalidPasswords) {
      await fillSignUpForm(page, validUser.name, validUser.email, invalidPassword);
      await page.click('button[type="submit"]');
      await expect(page.locator('text=/Password must contain|Password must be/')).toBeVisible();
    }
  });

  test('should handle successful registration', async ({ page }) => {
    // Mock successful registration response
    await page.route('**/api/users/register', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(validUser)
      });
    });
    
    await fillSignUpForm(page, validUser.name, validUser.email, validUser.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/signin');
  });

  test('should handle registration error', async ({ page }) => {
    // Mock failed registration response
    await page.route('**/api/users/register', async route => {
      await route.fulfill({
        status: 400,
        body: JSON.stringify({ message: 'Email already exists' })
      });
    });
    
    await fillSignUpForm(page, validUser.name, validUser.email, validUser.password);
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('should navigate to sign in page', async ({ page }) => {
    await page.click('text=Sign In');
    await expect(page).toHaveURL('/signin');
  });
});