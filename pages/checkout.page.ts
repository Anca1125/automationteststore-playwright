import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { GuestUser } from "../utils/checkout.test.data";

export class CheckoutPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly guestRadioButton: Locator;
  readonly registerRadioButton: Locator;
  readonly continueButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly faxInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly cityInput: Locator;
  readonly regionOption: Locator;
  readonly postCode: Locator;
  readonly countryOption: Locator;
  readonly checkSeparateAddress: Locator;
  readonly continueSubmitButton: Locator;
  readonly confirmOrderButton: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutButton = page.locator("#cart_checkout2");
    this.guestRadioButton = page.locator("#accountFrm_accountguest");
    this.registerRadioButton = page.locator("#accountFrm_accountregister");
    this.continueButton = page.locator('[title="Continue"]');
    this.firstNameInput = page.locator("#guestFrm_firstname");
    this.lastNameInput = page.locator("#guestFrm_lastname");
    this.emailInput = page.locator("#guestFrm_email");
    this.telephoneInput = page.locator("#guestFrm_telephone");
    this.faxInput = page.locator("#guestFrm_fax");
    this.companyInput = page.locator("#guestFrm_company");
    this.address1Input = page.locator("#guestFrm_address_1");
    this.address2Input = page.locator("#guestFrm_address_2");
    this.cityInput = page.locator("#guestFrm_city");
    this.regionOption = page.locator("#guestFrm_zone_id");
    this.postCode = page.locator("#guestFrm_postcode");
    this.countryOption = page.locator("#guestFrm_country_id");
    this.checkSeparateAddress = page.locator("#guestFrm_shipping_indicator");
    this.continueSubmitButton = page.getByRole("button", {
      name: " Continue",
    });
    this.confirmOrderButton = page.locator("#checkout_btn");
  }

  async openCheckoutLink() {
    await this.checkoutButton.click();
  }

  async checkGuestRadioButton() {
    await this.guestRadioButton.check();
  }
  async checkRegisterRadioButton() {
    await this.registerRadioButton.check();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async fillGuestCheckoutForm(user: GuestUser) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.telephoneInput.fill(user.telephone);
    await this.address1Input.fill(user.address1);
    await this.address2Input.fill(user.address2);
    await this.cityInput.fill(user.city);
    await this.regionOption.selectOption({ label: user.region });
    await this.postCode.fill(user.postCode);
    await this.countryOption.selectOption({ label: user.country });
  }

  async checkButtonForSeparateAddress() {
    await this.checkSeparateAddress.check();
  }
  async clickSubmitButton() {
    await this.continueSubmitButton.click();
  }
  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}
