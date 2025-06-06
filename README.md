# 📦 Conexa Challenge - E2E Tests with Playwright

Automated End-to-End (E2E) testing suite using **Playwright + TypeScript** to validate critical user flows on [Demoblaze](https://www.demoblaze.com/). 

---

## 🚀 Tech Stack & Setup

- ✅ Framework: [Playwright](https://playwright.dev/) `v1.52.0`
- 🧠 Language: TypeScript
- 🏗️ Pattern: Page Object Model (POM)
- 🧪 Tests: Login, Sign up, Add to Cart, Complete Purchase
- 🔍 Traceability: `console.log` + commented code for debugging and trace

---

## 📁 Project Structure

```bash
conexachallenge/
├── pages/                  # Page Object classes
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── CartPage.ts
│   ├── ProductPage.ts
│   └── SignupLoginPage.ts
│
├── tests/                  # Test suites
│   ├── AddToCartValidation.spec.ts
│   ├── CompleteOrder.spec.ts
│   └── UserEntity.spec.ts
│
├── playwright.config.ts   # Playwright global settings
├── package.json
├── package-lock.json
└── README.md               # You're here
```

---

## 📦 Installation & Run

### 1. Clone the repo and install dependencies:
```bash
git clone <your-repo-url>
cd conexachallenge
npm install
```

### 2. Run tests individually:
```bash
npm run test:entity      # Sign up + login validation
npm run test:cart        # Add product to cart and verify
npm run test:complete    # Complete purchase and validate
```

### 3. Open Last HTML report after run
```bash
npx playwright show-report # Serving HTML report with screenshots
```


> ✅ Make sure you have **Node.js >= 18** installed to run this project.

---

## 🔐 Test User Configuration

| Flow                        | User Used           | Details                     |
|-----------------------------|----------------------|-----------------------------|
| Sign up + Login             | Dynamic              | Creates new user per test  |
| Add to Cart + Validation    | Dynamic              | Includes product verification |
| Complete Order              | `QA1223` / `fede`     | Reuses an existing user    |

---

## ✅ Tests Implemented

### `UserEntity.spec.ts`
- Creates a user
- Performs login
- Verifies user is shown in the header

### `AddToCartValidation.spec.ts`
- Logs in with newly created user
- Selects a random product from home
- Adds it to cart
- Navigates to cart and confirms it’s there

### `CompleteOrder.spec.ts`
- Logs in with predefined user `QA1223`
- Selects a product and adds it to cart
- Completes order with form submission
- Validates confirmation dialog

---

## ✨ Highlights

- ✅ **Reusable page objects**
- ✅ **Console logging** at key steps
- ✅ **Structured wait conditions**
- ✅ **Test isolation** (new users or fixed ones)
- ✅ **Scalable POM design**
- ✅ **Scripted test shortcuts** in `package.json`
- ✅ **GITHUB Actions implemented**


---

## 🧠 Tips for Testers

- Check `console.log()` outputs for step-by-step visibility
- Use Playwright's `--trace` option for full trace debugging
- Adjust timeouts in `CartPage.ts` or `ProductPage.ts` if you experience flakiness

---

## 📌 Environment Requirements

- Node.js `>=18`
- npm `>=9`
- Internet connection to access https://www.demoblaze.com

---

Happy Testing 🚀