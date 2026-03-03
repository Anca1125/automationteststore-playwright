import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ForgotLoginData } from "../utils/forgot.login.data";

export class ForgotLoginPage extends BasePage {
  readonly forgotYourLogin: Locator;
  readonly lastNameInput: Locator;
  readonly emailAddressInput: Locator;
  readonly continueButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.forgotYourLogin = page.getByText("Forgot your login?");
    this.lastNameInput = page.locator("#forgottenFrm_lastname");
    this.emailAddressInput = page.locator("#forgottenFrm_email");
    this.continueButton = page.locator('[title="Continue"]');
    this.backButton = page.locator('[title="Back"]');
  }
  async openForgotYoutLogin() {
    await this.forgotYourLogin.click();
  }
  async fillForgotLoginForm(user: ForgotLoginData) {
    await this.lastNameInput.fill(user.lastName);
    await this.emailAddressInput.fill(user.email);
  }
  async clickOnContinueButton() {
    await this.continueButton.click();
  }
  async clickOnBackButton() {
    await this.backButton.click();
  }
}
