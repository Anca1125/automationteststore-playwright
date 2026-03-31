import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage.page";

test.describe("homepage module", () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await page.goto("/", { waitUntil: "load", timeout: 60000 });
  });

  test("homepage module - user is able to navigate to homepage", async ({
    page,
  }) => {
    await homePage.clickOnhomeLink();
    await expect(page).toHaveURL("https://automationteststore.com/");
  });
  test("homepage module - user is able to click on logo site", async ({
    page,
  }) => {
    await homePage.clickOnLogoSite();

    await expect(page).toHaveURL("https://automationteststore.com/");
  });
  test("homepage module - user is able to select a currency", async ({
    page,
  }) => {
    await homePage.openCurrencyDropdown();
    await homePage.selectEuroOption();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=index/home&currency=EUR",
    );
  });
  test("homepage module - user is able to click on cart summary", async ({
    page,
  }) => {
    await homePage.hoverOnSummaryCart();
    await homePage.selectViewCart();

    await homePage.hoverOnSummaryCart();
    await homePage.selectCheckout();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/cart",
    );
  });
  test("homepage module - user is able to open apparel and accesories category from homepage", async ({
    page,
  }) => {
    await homePage.openApparelAndAccesoriesCategory();

    await expect(
      page
        .locator("#categorymenu")
        .getByRole("link", { name: "Apparel & accessories" }),
    ).toBeVisible();
  });

  test("homepage module - user is able to open a subcategory from makeup category", async ({
    page,
  }) => {
    await homePage.openMakeupCategory();
    await page
      .locator("#categorymenu")
      .getByRole("link", { name: "Cheeks" })
      .click();

    await expect(
      page.getByRole("link", { name: "Skinsheen Bronzer Stick" }),
    ).toBeVisible();
  });

  test("homepage module - user is able to open a category from another category", async ({
    page,
  }) => {
    await homePage.openMakeupCategory();
    await page.getByRole("link", { name: "  Skincare" }).click();

    await expect(
      page.getByText("Products from award-winning skin care brands"),
    ).toBeVisible();
  });

  test("homepage module - user is able to click on Specials menu", async ({
    page,
  }) => {
    await homePage.clickOnSpecials();
    await expect(
      page.locator("#maincontainer").getByText("Special Offers"),
    ).toBeVisible();
  });

  test("homepage module  - user is able to click on account from menu, and than login and check your order submenu", async ({
    page,
  }) => {
    await homePage.clickOnAccount();
    await homePage.page.getByRole("link", { name: "Login" }).nth(1).click();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/login",
    );

    await homePage.clickOnAccount();
    await homePage.page
      .locator('#main_menu_top [data-id="menu_checkout"]')
      .click();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/cart",
    );
  });
  test("hompeage module - user is able to click on cart menu", async ({
    page,
  }) => {
    await homePage.clickOnCartLink();

    await expect(
      page.getByText(" Shopping Cart", { exact: true }),
    ).toBeVisible();
  });
  test("homepage module - user is able to click on checkout menu", async ({
    page,
  }) => {
    await homePage.clickOnCheckout();

    await expect(page.getByText("Your shopping cart is empty!")).toBeVisible();
  });
  test("homepage module - search - user is able to search a product by keyword", async ({
    page,
  }) => {
    await homePage.searchAProduct("Nail Lacquer");
    await homePage.page.getByTitle("Go").click();

    await expect(page.locator(".prdocutname").first()).toBeVisible();
  });
  test("homepage module - search - user is able to search items by advanced search", async ({
    page,
  }) => {
    await homePage.page.getByTitle("Go").click();
    await page.locator("#keyword").fill("Absolue Eye Precious Cells");
    await page.locator("#category_id").selectOption("0,43");
    await page.getByLabel("Search in product descriptions").check();
    await page.getByLabel("Search in product model").check();
    await page.locator("#search_button").click();

    await expect(
      page.getByText("Absolue Eye Precious Cells").first(),
    ).toBeVisible();
  });

  test("homepage module - search - no results displayed for non existing product", async ({
    page,
  }) => {
    await homePage.page.getByTitle("Go").click();
    await page.locator("#keyword").fill("ruj");
    await page.locator("#category_id").selectOption("0,43");
    await page.getByLabel("Search in product descriptions").check();
    await page.getByLabel("Search in product model").check();
    await page.locator("#search_button").click();

    await expect(
      page.getByText("There is no product that matches the search criteria."),
    ).toBeVisible();
  });
  test("homepage module - search - no results displayed for special caracthers", async ({
    page,
  }) => {
    await homePage.page.getByTitle("Go").click();
    await page.locator("#keyword").fill("*&^^^");
    await page.locator("#category_id").selectOption("0,43");
    await page.getByLabel("Search in product descriptions").check();
    await page.getByLabel("Search in product model").check();
    await page.locator("#search_button").click();

    await expect(
      page.getByText("There is no product that matches the search criteria."),
    ).toBeVisible();
  });

  test("user can add product to cart from homepage", async ({ page }) => {
    await homePage.addFirstProductToCart();

    await expect(page.getByRole("link", { name: /Items/ })).toContainText("1");
  });
});
