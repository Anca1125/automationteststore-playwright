import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly logoSite: Locator;
  readonly currencyDropdown: Locator;
  readonly cartSummary: Locator;
  readonly homeLink: Locator;
  readonly apparelAndAccesoriesCategory: Locator;
  readonly makeUpCategory: Locator;
  readonly skincareCategory: Locator;
  readonly fraganceCategory: Locator;
  readonly menCategory: Locator;
  readonly haircareCategory: Locator;
  readonly booksCategory: Locator;
  readonly specialsMenu: Locator;
  readonly accountMenu: Locator;
  readonly cartMenu: Locator;
  readonly checkoutMenu: Locator;
  readonly searchInput: Locator;
  readonly productListing: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.logoSite = page.locator('[title="Automation Test Store"]');
    this.currencyDropdown = page.locator(".block_6 .dropdown-toggle").first();
    this.cartSummary = page.getByRole("link", { name: "    0 Items - $" }); // #main_menu_top .dropdown
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.apparelAndAccesoriesCategory = page.getByRole("link", {
      name: "  Apparel & accessories",
    });
    this.makeUpCategory = page.getByRole("link", { name: "  Makeup" });
    this.skincareCategory = page.getByRole("link", { name: "  Skincare" });
    this.fraganceCategory = page.getByRole("link", { name: "  Fragrance" });
    this.menCategory = page.getByRole("link", { name: "  Men" });
    this.haircareCategory = page.getByRole("link", { name: "  Hair Care" });
    this.booksCategory = page.getByRole("link", { name: "  Books" });
    this.specialsMenu = page
      .locator("#main_menu_top")
      .getByRole("listitem")
      .filter({ hasText: "Specials" });
    this.accountMenu = page
      .locator("#main_menu_top")
      .getByText("Account Login Check Your Order");
    this.cartMenu = page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Cart" });
    this.checkoutMenu = page
      .locator("#main_menu_top")
      .getByRole("link", { name: "Checkout" });
    this.searchInput = page.locator('[placeholder="Search Keywords"]');
    this.productListing = page.locator(".fixed_wrapper .thumbnail");
    this.addToCartButtons = page.locator(".productcart");
  }
  async clickOnLogoSite() {
    await this.logoSite.click();
  }
  async openCurrencyDropdown() {
    await this.currencyDropdown.click();
  }
  async selectEuroOption() {
    await this.page.locator(".dropdown-menu.currency >> text=€ Euro").click();
  }

  async hoverOnSummaryCart() {
    await this.cartSummary.hover();
  }
  async selectViewCart() {
    await this.page.getByTitle("View Cart").click();
  }
  async selectCheckout() {
    await this.page.getByTitle("Checkout").click();
  }
  async clickOnhomeLink() {
    await this.homeLink.click();
  }
  async openApparelAndAccesoriesCategory() {
    await this.apparelAndAccesoriesCategory.click();
  }
  async openMakeupCategory() {
    await this.makeUpCategory.click();
  }
  async openSkincareCategory() {
    await this.skincareCategory.click();
  }
  async openFraganceCategory() {
    await this.fraganceCategory.click();
  }
  async openMenCategory() {
    await this.menCategory.click();
  }
  async openHaircareCategory() {
    await this.haircareCategory.click();
  }
  async openBooksCategory() {
    await this.booksCategory.click();
  }
  async clickOnSpecials() {
    await this.specialsMenu.click();
  }
  async clickOnAccount() {
    await this.accountMenu.click();
  }
  async clickOnCartLink() {
    await this.cartMenu.click();
  }

  async clickOnCheckout() {
    await this.checkoutMenu.click();
  }
  async searchAProduct(value: string) {
    await this.searchInput.fill(value);
  }
  async clickOnAproduct() {
    await this.productListing.click();
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }
}
