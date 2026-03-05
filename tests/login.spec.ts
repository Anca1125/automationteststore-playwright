import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/login.page";
import {
  invalidLoginData,
  LoginUser,
  validLoginData,
  blankLoginUsers,
  edgeCaseLoginUsers,
} from "../utils/login-test-data";
import { ForgotPasswordPage } from "../pages/forgot.password.page";
import { ForgotPasswordData } from "../utils/forgot.password.test.data";
import {
  validForgotPasswordData,
  invalidForgotPasswordData,
  blankForgotPasswordData,
} from "../utils/forgot.password.test.data";
import { ForgotLoginData } from "../utils/forgot.login.data";
import { ForgotLoginPage } from "../pages/forgot.login.page";
import {
  validForgotYourLogin,
  invalidForgotYourLogin,
  blankFields,
} from "../utils/forgot.login.data";
import { MyAccountPage } from "../pages/myAccount.page";

test.describe("login module", () => {
  let loginPage: LoginPage;
  let forgotPasswordPage: ForgotPasswordPage;
  let forgotLoginPage: ForgotLoginPage;
  let myAccountPage: MyAccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    forgotPasswordPage = new ForgotPasswordPage(page);
    forgotLoginPage = new ForgotLoginPage(page);
    myAccountPage = new MyAccountPage(page);
    await page.goto("/");
  });
  test("login - user is able to login successfully with valid data", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(validLoginData);
    await loginPage.clickOnLoginButton();

    await expect(myAccountPage.accountHeader).toBeVisible();
    await expect(page).toHaveURL(/account/);
  });

  test("login - user is not able to login with non-existent login user", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(invalidLoginData.nonExistingUser);
    await loginPage.clickOnLoginButton();

    await expect(
      page.getByText("Error: Incorrect login or password provided."),
    ).toBeVisible();
  });

  test("login - user is not able to login with wrong password", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(invalidLoginData.wrongPassword);
    await loginPage.clickOnLoginButton();

    await expect(
      page.getByText("Error: Incorrect login or password provided."),
    ).toBeVisible();
  });

  test("login - user is not able to login with blank fields", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(blankLoginUsers.bothBlank);
    await loginPage.clickOnLoginButton();

    await expect(
      page.getByText("Error: Incorrect login or password provided."),
    ).toBeVisible();
  });

  test("login - user is not able to login with special characters in login name and password inputs", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(edgeCaseLoginUsers.specialCharacters);
    await loginPage.clickOnLoginButton();

    await expect(
      page.getByText("Error: Incorrect login or password provided."),
    ).toBeVisible();
  });

  test("login - user is not able to login with spaces in login name and password", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm(edgeCaseLoginUsers.withSpaces);
    await loginPage.clickOnLoginButton();

    await expect(
      page.getByText("Error: Incorrect login or password provided."),
    ).toBeVisible();
  });

  test.skip("login - forgot password - user is able to reset the password using valid data", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotPasswordPage.openForgotYourPasswordLink();
    await forgotPasswordPage.fillForgotYourPassordForm(validForgotPasswordData);
    await forgotPasswordPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Success: Password reset link has been sent to your e-mail address.",
      ),
    ).toBeVisible();
  });

  test("login - forgot password - user is not able to reset the password using invalid login name", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotPasswordPage.openForgotYourPasswordLink();
    await forgotPasswordPage.fillForgotYourPassordForm(
      invalidForgotPasswordData.nonExistingData,
    );
    await forgotPasswordPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: No records found matching information your provided, please check your information and try again!",
      ),
    ).toBeVisible();
  });

  test("login - forgot password - user is not able to reset the password using invalid format for email", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotPasswordPage.openForgotYourPasswordLink();
    await forgotPasswordPage.fillForgotYourPassordForm(
      invalidForgotPasswordData.invalidFormat,
    );
    await forgotPasswordPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: No records found matching information your provided, please check your information and try again!",
      ),
    ).toBeVisible();
  });

  test("login - forgot password - user is not able to reset the password with blank fields", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotPasswordPage.openForgotYourPasswordLink();
    await forgotPasswordPage.fillForgotYourPassordForm(
      blankForgotPasswordData.bothBlank,
    );
    await forgotPasswordPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: The Email address was not provided or not found in our records, please try again!",
      ),
    ).toBeVisible();
  });

  test("login - forgot password -  user is able to go back to login page from forgot your password page", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotPasswordPage.openForgotYourPasswordLink();
    await forgotPasswordPage.fillForgotYourPassordForm(
      blankForgotPasswordData.bothBlank,
    );
    await forgotPasswordPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: The Email address was not provided or not found in our records, please try again!",
      ),
    ).toBeVisible();

    await forgotPasswordPage.clickOnBackButton();
  });

  test.skip("login - forgot login - user is able to recover login name with valid last name and email", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotLoginPage.openForgotYoutLogin();
    await forgotLoginPage.fillForgotLoginForm(validForgotYourLogin);
    await forgotLoginPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Success: Your login name reminder has been sent to your e-mail address.",
      ),
    ).toBeVisible();
  });

  test("login - forgot login - user is nor able to recover login name with a wrong last name", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotLoginPage.openForgotYoutLogin();
    await forgotLoginPage.fillForgotLoginForm(
      invalidForgotYourLogin.wrongLastName,
    );
    await forgotLoginPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: No records found matching information your provided, please check your information and try again!",
      ),
    ).toBeVisible();
  });

  test("login - forgot login - user is not able to recover login name with a invalid email", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotLoginPage.openForgotYoutLogin();
    await forgotLoginPage.fillForgotLoginForm(
      invalidForgotYourLogin.invalidEmail,
    );
    await forgotLoginPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: No records found matching information your provided, please check your information and try again!",
      ),
    ).toBeVisible();
  });

  test("login - forgot login - user is not able to recover login name with blank fields", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotLoginPage.openForgotYoutLogin();
    await forgotLoginPage.fillForgotLoginForm(blankFields.bothBlank);
    await forgotLoginPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: The Email address was not provided or not found in our records, please try again!",
      ),
    ).toBeVisible();
  });

  test("login - forgot login - user is able to go back to login page from forgot your login name page", async ({
    page,
  }) => {
    await loginPage.openLoginOrRegisterLink();
    await forgotLoginPage.openForgotYoutLogin();
    await forgotLoginPage.fillForgotLoginForm(blankFields.bothBlank);
    await forgotLoginPage.clickOnContinueButton();

    await expect(
      page.getByText(
        "Error: The Email address was not provided or not found in our records, please try again!",
      ),
    ).toBeVisible();

    await forgotLoginPage.clickOnBackButton();

    await expect(page).toHaveURL(/login/);
  });
});
