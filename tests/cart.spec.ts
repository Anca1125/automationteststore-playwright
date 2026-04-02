import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { HomePage } from "../pages/homepage.page";

test.describe("cart module", () => {
  let homePage: HomePage;
  let cartPage: CartPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);

    await page.goto("/", { waitUntil: "load" });
  });
  test("cart module- user is able to open cart page", async ({ page }) => {
    await cartPage.openCart();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/cart",
    );
  });
  test("cart module - user can add product to cart", async ({ page }) => {
    await homePage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartContainer).toBeVisible();
  });
  test("cart module - empty cart displays correct message", async ({
    page,
  }) => {
    await cartPage.openCart();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test("cart module - user cand remove product from the cart", async ({
    page,
  }) => {
    await homePage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.removeProduct();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test("cart module - user is able to update the quantity", async ({
    page,
  }) => {
    await homePage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.quantityInput.fill("3");
    await cartPage.updateButton.click();

    await expect(cartPage.quantityInput).toHaveValue("3");
  });

  test("cart module - user is not able to applay a invalid coupon", async ({
    page,
  }) => {
    await homePage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.couponInput.fill("Abcd");
    await cartPage.applayCoupoButton.click();
    await expect(
      page.getByText(
        "Error: Coupon is either invalid, expired or reached it's usage limit!",
      ),
    ).toBeVisible();
  });

  test("cart module - user is able to continue shopping", async ({ page }) => {
    await homePage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.continueShoppingButton.click();

    await expect(page).toHaveURL("https://automationteststore.com/");
  });

  test("cart module - user is able to checkout from cart page", async ({
    page,
  }) => {
    await homePage.addFirstProductToCart();
    await cartPage.openCart();
    await cartPage.checkoutButton.click();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/login",
    );
  });
});
