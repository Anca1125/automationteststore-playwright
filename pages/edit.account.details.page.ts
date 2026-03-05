import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { EditAccountData } from "../utils/edit.account.details.data";

export class EditAccountDetailsPage extends BasePage {
  readonly editAccountDetailsLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly faxInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.editAccountDetailsLink = page.getByText("  Edit account details");
    this.firstNameInput = page.locator("#AccountFrm_firstname");
    this.lastNameInput = page.locator("#AccountFrm_lastname");
    this.emailInput = page.locator("#AccountFrm_email");
    this.telephoneInput = page.locator("#AccountFrm_telephone");
    this.faxInput = page.locator("#AccountFrm_fax");
    this.continueButton = page.locator('[title="Continue"]');
  }
  async openEditAccountDetailsLink() {
    await this.editAccountDetailsLink.click();
  }
  async fillEditAccountDetailsForm(user: EditAccountData) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.telephoneInput.fill(user.telephone);
    await this.faxInput.fill(user.fax);
  }
  async clickonContinueButton() {
    await this.continueButton.click();
  }
}
