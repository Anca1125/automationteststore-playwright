import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MyAccountPage extends BasePage {
  readonly accountHeader: Locator;
  readonly editAccountDetails: Locator;
  readonly changePassword: Locator;
  readonly manageAddressBook: Locator;
  readonly logoff: Locator;
  constructor(page: Page) {
    super(page);
    this.accountHeader = page.getByRole("heading", {
      name: "My Account",
      level: 2,
    });
    this.editAccountDetails = page.getByRole("link", {
      name: "Edit account details",
    });
    this.changePassword = page.getByRole("link", { name: "  Change password" });
    this.manageAddressBook = page.getByRole("link", {
      name: "  Manage Address Book",
    });
    this.logoff = page.getByRole("link", { name: "  Logoff", exact: true });
  }

  async openEditAccount() {
    await this.editAccountDetails.click();
  }
  async openChangePassword() {
    await this.changePassword.click();
  }
  async openAddressBook() {
    await this.manageAddressBook.click();
  }
  async clickOnLogoff() {
    await this.logoff.click();
  }
}
