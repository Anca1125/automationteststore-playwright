import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginUser } from "../utils/login-test-data";

export class LoginPage extends BasePage {
  readonly loginOrRegisterLink: Locator;
  readonly loginName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly forgotYourPassword: Locator;
  readonly forgotYourLogin: Locator;
  constructor(page: Page) {
    super(page);
    this.loginOrRegisterLink = page.getByText("Login or register");
    this.loginName = page.locator("#loginFrm_loginname");
    this.password = page.locator("#loginFrm_password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.forgotYourPassword = page.getByText("Forgot your password?");
    this.forgotYourLogin = page.getByText("Forgot your login?");
  }

  async openLoginOrRegisterLink() {
    await this.loginOrRegisterLink.click();
  }
  async fillLoginForm(user: LoginUser) {
    await this.loginName.fill(user.username);
    await this.password.fill(user.password);
  }
  async clickOnLoginButton() {
    await this.loginButton.click();
  }
  async clickOnForgotYourPassword() {
    await this.forgotYourPassword.click();
  }

  async clickOnForgotYourLogin() {
    await this.forgotYourLogin.click();
  }
}
