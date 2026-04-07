import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage.page";
import { CartPage } from "../pages/cart.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { generateGuestUser } from "../utils/checkout.test.data";
import { LoginPage } from "../pages/login.page";
import {
  invalidLoginData,
  LoginUser,
  validLoginData,
  blankLoginUsers,
  edgeCaseLoginUsers,
} from "../utils/login-test-data";
import { MyAccountPage } from "../pages/myAccount.page";

test.describe("checkout module", () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);

    await page.goto("/", { waitUntil: "load", timeout: 60000 });
  });
  test("checkout module - guest user can place order successfully", async ({
    page,
  }) => {
    const guestUser = generateGuestUser();

    await expect(page).toHaveURL("https://automationteststore.com/");

    await homePage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartContainer).toBeVisible();

    await checkoutPage.openCheckoutLink();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/login",
    );

    await checkoutPage.checkGuestRadioButton();
    await checkoutPage.clickContinueButton();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/guest_step_1",
    );

    await checkoutPage.fillGuestCheckoutForm(guestUser);
    //await checkoutPage.checkButtonForSeparateAddress();
    await checkoutPage.clickSubmitButton();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/guest_step_3",
    );
    await expect(page.locator(".maintext")).toHaveText(
      " Checkout Confirmation",
    );

    await checkoutPage.confirmOrder();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/success",
    );
    await expect(page.locator(".maintext")).toHaveText(
      " Your Order Has Been Processed!",
    );
  });

  test("checkout module - guest user cannot checkout with missing email", async ({
    page,
  }) => {
    const guestUser = generateGuestUser();
    guestUser.email = "";

    await homePage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartContainer).toBeVisible();

    await checkoutPage.openCheckoutLink();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/login",
    );

    await checkoutPage.checkGuestRadioButton();
    await checkoutPage.clickContinueButton();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/guest_step_1",
    );

    await checkoutPage.fillGuestCheckoutForm(guestUser);
    await checkoutPage.clickSubmitButton();

    await expect(
      page.getByText("E-Mail Address does not appear to be valid!"),
    ).toBeVisible();
  });

  test("checkout module - guest user cannot checkout without address", async ({
    page,
  }) => {
    const guestUser = generateGuestUser();
    guestUser.address1 = "";

    await homePage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartContainer).toBeVisible();

    await checkoutPage.openCheckoutLink();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/login",
    );

    await checkoutPage.checkGuestRadioButton();
    await checkoutPage.clickContinueButton();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/guest_step_1",
    );

    await checkoutPage.fillGuestCheckoutForm(guestUser);
    await checkoutPage.clickSubmitButton();

    await expect(
      page.getByText(
        "Address 1 must be greater than 3 and less than 128 characters!",
      ),
    ).toBeVisible();
  });

  test("checkout module - logged in user can place order successfully", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(validLoginData);
    await loginPage.clickOnLoginButton();

    await expect(myAccountPage.accountHeader).toBeVisible();
    await expect(page).toHaveURL(/account/);
    await myAccountPage.page
      .getByRole("link", { name: "Home", exact: true })
      .click();

    await expect(page).toHaveURL("https://automationteststore.com/");

    await homePage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartContainer).toBeVisible();
    await cartPage.checkoutButton.click();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/confirm",
    );
    await checkoutPage.confirmOrder();
    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=checkout/success",
    );
    await expect(page.locator(".maintext")).toHaveText(
      " Your Order Has Been Processed!",
    );
  });

  test("checkout module - logged user cannot checkout with empty cart", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(validLoginData);
    await loginPage.clickOnLoginButton();

    await expect(myAccountPage.accountHeader).toBeVisible();
    await expect(page).toHaveURL(/account/);
    await myAccountPage.page
      .getByRole("link", { name: "Home", exact: true })
      .click();

    await expect(page).toHaveURL("https://automationteststore.com/");
    await homePage.clickOnCheckout();

    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText("Your shopping cart is empty!")).toBeVisible();
  });
});
