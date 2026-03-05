import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ManageAddressBook } from "../utils/manage.address.book.data";

export class AddressFormPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly cityInput: Locator;
  readonly stateSelectOption: Locator;
  readonly postCodeInput: Locator;
  readonly countrySelectOption: Locator;
  readonly defaultAddressYes: Locator;
  readonly defaultAddressNo: Locator;
  readonly continueButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("#AddressFrm_firstname");
    this.lastNameInput = page.locator("#AddressFrm_lastname");
    this.companyInput = page.locator("#AddressFrm_company");
    this.address1Input = page.locator("#AddressFrm_address_1");
    this.address2Input = page.locator("#AddressFrm_address_2");
    this.cityInput = page.locator("#AddressFrm_city");
    this.stateSelectOption = page.locator("#AddressFrm_zone_id");
    this.postCodeInput = page.locator("#AddressFrm_postcode");
    this.countrySelectOption = page.locator("#AddressFrm_country_id");
    this.defaultAddressYes = page.getByLabel("Yes");
    this.defaultAddressNo = page.getByLabel("No");
    this.continueButton = page.locator('[title="Continue"]');
    this.backButton = page.locator('[title="Back"]');
  }
  async setDefaultAddress(isDefault: boolean) {
    if (isDefault) {
      await this.defaultAddressYes.check();
    } else {
      await this.defaultAddressNo.check();
    }
  }
  async completeAddressForm(address: ManageAddressBook) {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    await this.companyInput.fill(address.company);
    await this.address1Input.fill(address.address1);
    await this.address2Input.fill(address.address2);
    await this.cityInput.fill(address.city);
    await this.postCodeInput.fill(address.postCode);

    await this.countrySelectOption.selectOption({ label: address.country });
    await this.page.waitForTimeout(500);
    await this.stateSelectOption.selectOption({ label: address.state });

    await this.setDefaultAddress(address.defaultAddress);
  }
  async clickOnContinueButton() {
    await this.continueButton.click();
  }
  async clickOnBackButton() {
    await this.backButton.click();
  }
}
