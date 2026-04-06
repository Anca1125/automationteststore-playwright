import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/product.page";
import { HomePage } from "../pages/homepage.page";

test.describe("product page", () => {
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await page.goto("/", { waitUntil: "load", timeout: 60000 });
  });
  test("product module - user can open a product link", async ({ page }) => {
    await homePage.page.locator(".prdocutname").first().click();

    await expect(page).toHaveURL(/product/);
    await expect(page.locator("#description")).toBeVisible();
    await expect(page.locator(".productprice")).toBeVisible();
  });

  test("product module - user is able to update quantity", async ({ page }) => {
    await homePage.page.locator(".prdocutname").first().click();
    await productPage.fillQuantity("4");
    await expect(productPage.quantityInput).toHaveValue("4");
  });

  test("product module - user is able to add to cart products", async ({
    page,
  }) => {
    await homePage.page.locator(".prdocutname").first().click();
    await productPage.fillQuantity("4");
    await productPage.addToCart();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/cart",
    );
    await expect(page.locator("td.align_left a")).toBeVisible();
    await expect(page.locator('input[name*="quantity"]')).toHaveValue("4");
  });
});
