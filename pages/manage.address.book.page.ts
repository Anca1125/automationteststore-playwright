import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ManageAddressBookPage extends BasePage {
  readonly editAddress: Locator;
  readonly addNewAddress: Locator;
  readonly backButton: Locator;
  readonly deleteNewAddressButton: Locator;
  constructor(page: Page) {
    super(page);
    this.editAddress = page.locator('[title="Edit"]').first();
    this.addNewAddress = page.locator('[title="New Address"]');
    this.backButton = page.locator('[title="Back"]');
    this.deleteNewAddressButton = page.locator('[title="Delete"]').first();
  }
  async clickOnEditAddress() {
    await this.editAddress.click();
  }
  async clickOnAddNewAddress() {
    await this.addNewAddress.click();
  }
  async clickOnBackButton() {
    await this.backButton.waitFor();
    await this.backButton.click();
  }
  async deleteNewAddress() {
    await this.deleteNewAddressButton.click();
  }
}
