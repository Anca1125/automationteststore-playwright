📄 Test Plan
Project: Automation Test Store – E2E Automation

1. Introduction
   This document describes the testing strategy, scope, and deliverables for the automation project built for the Automation Test Store demo e-commerce application.
   The purpose of this project is to validate critical end-to-end user flows using automated tests developed with Playwright and TypeScript.

2. Objectives

- Validate core e-commerce functionalities
- Ensure stability of critical user journeys
- Detect regressions through automated execution
- Apply structured automation design using POM
- Integrate tests into a CI pipeline

3. Scope

✅ In Scope

- User Registration
- Login / Logout
- Account management
- Product browsing
- Product details
- Add to cart
- Cart updates
- Checkout process
- Form validations
- Error message validation

❌ Out of Scope

- Performance testing
- Security testing
- API testing
- Accessibility testing
- Cross-browser extensive testing

4. Test Strategy

Testing Type: End-to-End Automation Testing
Automation Framework: Playwright
Language: TypeScript
Design Pattern: Page Object Model (POM)
CI/CD Integration: GitHub Actions

Test Design Techniques Used:

- Positive & Negative Testing
- Boundary Value Analysis (BVA)
- Equivalence Partitioning (EP)

5. Test Environment

Application: Automation Test Store
Browser: Chromium
OS: Windows
Execution: Local & CI pipeline
Repository: GitHub

6. Entry Criteria

- Application is accessible
- Test environment is stable
- Required test data is available
- Automation framework configured

7. Exit Criteria

- All critical E2E flows executed
- No critical or high severity defects open
- CI pipeline execution successful
- Test results reviewed

8. Deliverable
   The following deliverables are produced as part of this project:
   ✔️ Test Plan document
   ✔️ Automated test scripts (Playwright + TypeScript)
   ✔️ Page Object Model implementation
   ✔️ HTML Test Execution Reports
   ✔️ GitHub Actions CI configuration
   ✔️ Documented defects (GitHub Issues)

9. Risks & Limitations

- Demo environment instability
- Dynamic test data issues
- UI changes affecting locators
- Slow response times impacting test stability
