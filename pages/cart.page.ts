import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly cartLink: Locator;
  readonly cartContainer: Locator;
  readonly emptyCartMessage: Locator;
  readonly removeButton: Locator;
  readonly quantityInput: Locator;
  readonly updateButton: Locator;
  readonly couponInput: Locator;
  readonly applayCoupoButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.cartLink = page.getByRole("link", { name: /Items/ });
    this.cartContainer = page.locator(".container-fluid.cart-info").first();
    this.emptyCartMessage = page.getByText("Your shopping cart is empty!");
    this.removeButton = page.locator('a[href*="remove"]');
    this.quantityInput = page.locator("#cart_quantity50");
    this.updateButton = page.locator("#cart_update");
    this.couponInput = page.locator("#coupon_coupon");
    this.applayCoupoButton = page.locator("#apply_coupon_btn");
    this.continueShoppingButton = page.getByRole("link", {
      name: /Continue Shopping/,
    });
    this.checkoutButton = page.locator("#cart_checkout2");
  }
  async openCart() {
    await this.cartLink.click();
  }
  async removeProduct() {
    await this.removeButton.first().click();
  }
}
