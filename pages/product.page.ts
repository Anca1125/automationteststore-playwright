import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  constructor(page: Page) {
    super(page);
    this.productName = page.locator(".productname");
    this.addToCartButton = page.locator(".productpagecart");
    this.quantityInput = page.locator("#product_quantity");
  }
  async addToCart() {
    await this.addToCartButton.click();
  }
  async fillQuantity(value: string) {
    await this.quantityInput.fill(value);
  }
}
