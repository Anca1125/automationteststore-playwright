import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ChangePassword } from "../utils/change.password.test.data";

export class ChangePasswordPage extends BasePage {
  readonly currentPassword: Locator;
  readonly newPassword: Locator;
  readonly newPasswordConfirm: Locator;
  readonly continueButton: Locator;
  readonly backButton: Locator;
  readonly currentPasswordError: Locator;
  readonly confirmPasswordError: Locator;
  readonly emptyFieldsError: Locator;
  readonly invalidLengthError: Locator;
  constructor(page: Page) {
    super(page);
    this.currentPassword = page.locator("#PasswordFrm_current_password");
    this.newPassword = page.locator("#PasswordFrm_password");
    this.newPasswordConfirm = page.locator("#PasswordFrm_confirm");
    this.continueButton = page.locator('[title="Continue"]');
    this.backButton = page.locator('[title="Back"]');
    this.currentPasswordError = page.locator(
      ".form-group.has-error .help-block",
    );
    this.confirmPasswordError = page.locator(
      'input[name="confirm"] >> xpath=ancestor::div[contains(@class,"form-group")]//span[@class="help-block"]',
    );
    this.emptyFieldsError = page.locator("h4.heading4");
    this.invalidLengthError = page.getByText(
      "Password must be between 4 and 20 characters!",
    );
  }
  async fillPasswordForm(user: ChangePassword) {
    await this.currentPassword.fill(user.currentPassword);
    await this.newPassword.fill(user.newPassword);
    await this.newPasswordConfirm.fill(user.newPasswordConfirm);
  }
  async clickOnContinueButton() {
    await this.continueButton.click();
  }
  async clickOnBackButton() {
    await this.backButton.click();
  }
}
