# 🛍 Automation Test Store – E2E Automation Project

**Author:** Anca Nechita

---

## 📌 About

This is an automation testing project for an e-commerce demo website, built using Playwright and TypeScript.

The goal of the project was to practice QA automation and test the main flows of an online store.

---

## 🚀 What is tested

The project includes tests for:

- homepage
- login
- product page
- cart
- checkout
- my account

---

## 🧪 Test scenarios

### Homepage

- navigation through categories
- opening products from homepage
- using search (basic and advanced search)
- selecting currency
- accessing cart and checkout from menu

### Login

- valid login
- invalid login
- blank fields
- special characters

### Product & Cart

- add product to cart
- update quantity
- basic validations

### Checkout

- guest checkout
- logged user checkout
- negative cases:
  - missing email
  - missing address
  - empty cart

### My Account

- access account dashboard
- edit account details
- change password
- manage address book (add, edit, delete)

---

## 🧠 Test approach

Basic testing techniques used:

- equivalence partitioning
- boundary value analysis
- negative testing
- edge cases

---

## 🏗 Structure

The project is organized using Page Object Model (POM), so tests are easier to read and maintain.

---

## ⚙️ Tech stack

- Playwright
- TypeScript
- GitHub

---

## 🔁 CI

Tests are running automatically with GitHub Actions when a Pull Request is created.

---

## ▶️ Run tests

```bash
npm install
npx playwright test
```

---

## 📎 Notes

This project was created for practice and learning QA automation.
