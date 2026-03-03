import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ForgotPasswordData } from "../utils/forgot.password.test.data";

export class ForgotPasswordPage extends BasePage {
  readonly forgotYourPasswordLink: Locator;
  readonly loginName: Locator;
  readonly emailAddress: Locator;
  readonly backButton: Locator;
  readonly continueButton: Locator;
  constructor(page: Page) {
    super(page);
    this.forgotYourPasswordLink = page.getByText("Forgot your password?");
    this.loginName = page.locator("#forgottenFrm_loginname");
    this.emailAddress = page.locator("#forgottenFrm_email");
    this.backButton = page.locator('[title="Back"]');
    this.continueButton = page.getByRole("button", { name: "Continue" });
  }

  async openForgotYourPasswordLink() {
    await this.forgotYourPasswordLink.click();
  }
  async fillForgotYourPassordForm(user: ForgotPasswordData) {
    await this.loginName.fill(user.loginName);
    await this.emailAddress.fill(user.email);
  }
  async clickOnContinueButton() {
    await this.continueButton.click();
  }
  async clickOnBackButton() {
    await this.backButton.click();
  }
}
