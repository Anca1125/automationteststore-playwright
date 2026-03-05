import { test, expect } from "@playwright/test";
import { MyAccountPage } from "../pages/myAccount.page";
import { LoginPage } from "../pages/login.page";
import {
  invalidLoginData,
  LoginUser,
  validLoginData,
  blankLoginUsers,
  edgeCaseLoginUsers,
} from "../utils/login-test-data";
import { EditAccountDetailsPage } from "../pages/edit.account.details.page";
import { EditAccountData } from "../utils/edit.account.details.data";
import {
  validData,
  invalidEmail,
  blankFields,
  tooLongName,
} from "../utils/edit.account.details.data";
import { ChangePasswordPage } from "../pages/change.password.page";
import { ChangePassword } from "../utils/change.password.test.data";
import {
  validPassword,
  invalidCurrentPassword,
  invalidConfirmNewPassword,
  tooLongPassword,
  emptyFields,
} from "../utils/change.password.test.data";
import { generateRandomEmail } from "../utils/data.generator";
import { ManageAddressBookPage } from "../pages/manage.address.book.page";
import { AddressFormPage } from "../pages/address.form.page";
import {
  generateEditAddressBook,
  generateAddNewAddressBook,
  ManageAddressBook,
} from "../utils/manage.address.book.data";

let currentPassword = "Ecaterina3@";
test.describe("my account", () => {
  let myAccountPage: MyAccountPage;
  let loginPage: LoginPage;
  let editAccountDetailsPage: EditAccountDetailsPage;
  let changePasswordPage: ChangePasswordPage;
  let manageAddressBookPage: ManageAddressBookPage;
  let addressFormPage: AddressFormPage;

  test.beforeEach(async ({ page }) => {
    myAccountPage = new MyAccountPage(page);
    loginPage = new LoginPage(page);
    editAccountDetailsPage = new EditAccountDetailsPage(page);
    changePasswordPage = new ChangePasswordPage(page);
    manageAddressBookPage = new ManageAddressBookPage(page);
    addressFormPage = new AddressFormPage(page);

    await page.goto("/");
    await loginPage.openLoginOrRegisterLink();
    await loginPage.fillLoginForm({
      ...validLoginData,
      password: currentPassword,
    });
    await loginPage.clickOnLoginButton();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/account",
    );
  });

  test("myaccount - after login, user is redirected to My account page", async ({
    page,
  }) => {
    await expect(myAccountPage.accountHeader).toBeVisible();
    await expect(myAccountPage.changePassword).toBeVisible();
    await expect(myAccountPage.manageAddressBook).toBeVisible();
    await expect(myAccountPage.logoff).toBeVisible();
  });

  test("my account - edit account - user is able to edit details account with valid data", async ({
    page,
  }) => {
    await myAccountPage.openEditAccount();

    const userWithRandomEmail = {
      ...validData,
      email: generateRandomEmail(),
    };

    await editAccountDetailsPage.fillEditAccountDetailsForm(
      userWithRandomEmail,
    );
    await editAccountDetailsPage.clickonContinueButton();

    await expect(
      page.getByText("Success: Your account has been successfully updated."),
    ).toBeVisible();
  });

  test("my account - edit account -  user is not able to edit details account with invalid email address", async ({
    page,
  }) => {
    await myAccountPage.openEditAccount();
    await editAccountDetailsPage.fillEditAccountDetailsForm(invalidEmail);
    await editAccountDetailsPage.clickonContinueButton();

    await expect(
      page.getByText("Oops, there is an error with information provided!"),
    ).toBeVisible();
  });

  test("my account - edit account- user is not able to edit details account with blank fields in form", async ({
    page,
  }) => {
    await myAccountPage.openEditAccount();
    await editAccountDetailsPage.fillEditAccountDetailsForm(blankFields);
    await editAccountDetailsPage.clickonContinueButton();

    await expect(
      page.getByText("Oops, there is an error with information provided!"),
    ).toBeVisible();
  });

  test("my account - edit account - user is not able to edit details account with exceeded number of characters ", async ({
    page,
  }) => {
    await myAccountPage.openEditAccount();

    const userWithRandomEmail = {
      ...tooLongName,
      email: generateRandomEmail(),
    };
    await editAccountDetailsPage.fillEditAccountDetailsForm(
      userWithRandomEmail,
    );
    await editAccountDetailsPage.clickonContinueButton();

    await expect(
      page.getByText("Oops, there is an error with information provided!"),
    ).toBeVisible();
  });

  test("my account - change password - user is able to change password using valid password and revert it back", async ({
    page,
  }) => {
    const newPassword = "Ecaterina4#";

    await myAccountPage.openChangePassword();
    await changePasswordPage.fillPasswordForm({
      currentPassword: currentPassword,
      newPassword: newPassword,
      newPasswordConfirm: newPassword,
    });

    await changePasswordPage.clickOnContinueButton();

    await expect(
      page.getByText("Success: Your password has been successfully updated."),
    ).toBeVisible();

    currentPassword = newPassword;

    await myAccountPage.openChangePassword();
    await changePasswordPage.fillPasswordForm({
      currentPassword: currentPassword,
      newPassword: "Ecaterina3@",
      newPasswordConfirm: "Ecaterina3@",
    });

    await changePasswordPage.clickOnContinueButton();

    await expect(
      page.getByText("Success: Your password has been successfully updated."),
    ).toBeVisible();
    currentPassword = "Ecaterina3@";
  });

  test("my account - change password - user is not able to change password using invalid current password", async ({
    page,
  }) => {
    await myAccountPage.openChangePassword();
    await changePasswordPage.fillPasswordForm(invalidCurrentPassword);
    await changePasswordPage.clickOnContinueButton();

    await expect(changePasswordPage.currentPassword).toBeVisible();
  });
  test("my account - change password - user is not able to change password using invalid confirm new password", async ({
    page,
  }) => {
    await myAccountPage.openChangePassword();
    await changePasswordPage.fillPasswordForm(invalidConfirmNewPassword);
    await changePasswordPage.clickOnContinueButton();

    await expect(changePasswordPage.currentPasswordError).toBeVisible();
  });
  test("my account - change password - user is not able to change password using blank fields", async ({
    page,
  }) => {
    await myAccountPage.openChangePassword();
    await changePasswordPage.fillPasswordForm(emptyFields);
    await changePasswordPage.clickOnContinueButton();
    await expect(changePasswordPage.emptyFieldsError).toContainText(
      "To update your password, please provide current and new password details",
    );
  });
  test("my account - change password - user is not able to change password using too log passwords", async ({
    page,
  }) => {
    await myAccountPage.openChangePassword();
    await changePasswordPage.fillPasswordForm(tooLongPassword);
    await changePasswordPage.clickOnContinueButton();

    await expect(changePasswordPage.invalidLengthError).toHaveText(
      "Password must be between 4 and 20 characters!",
    );
  });
  test("my account - change password - user is able to navigate back from change passord page to account dashboard", async ({
    page,
  }) => {
    await myAccountPage.openChangePassword();
    await changePasswordPage.fillPasswordForm(tooLongPassword);
    await changePasswordPage.clickOnBackButton();

    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/account",
    );
  });
  test("my account - manage address book - user can edit the address successfully", async ({
    page,
  }) => {
    const address = generateEditAddressBook();

    await myAccountPage.openAddressBook();
    await manageAddressBookPage.clickOnEditAddress();
    await addressFormPage.completeAddressForm(address);
    await addressFormPage.clickOnContinueButton();

    await expect(
      page.getByText("Your address has been successfully updated"),
    ).toBeVisible();
  });
  test("my account - manage address book - user is able to go back from edited address book to my account page", async ({
    page,
  }) => {
    const address = generateEditAddressBook();

    await myAccountPage.openAddressBook();
    await manageAddressBookPage.clickOnEditAddress();
    await addressFormPage.completeAddressForm(address);
    await addressFormPage.clickOnContinueButton();

    await expect(
      page.getByText("Your address has been successfully updated"),
    ).toBeVisible();

    await addressFormPage.clickOnBackButton();

    await expect(page).toHaveURL(/account/);
  });
  test("my account - manage address book - user is able to add a new address book", async ({
    page,
  }) => {
    const newAddress = generateAddNewAddressBook();

    await myAccountPage.openAddressBook();
    await manageAddressBookPage.clickOnAddNewAddress();
    await addressFormPage.completeAddressForm(newAddress);
    await addressFormPage.clickOnContinueButton();

    await expect(
      page.getByText("Your address has been successfully inserted"),
    ).toBeVisible();
  });

  test("my account - manage address book - user is able to delete new address and edited address", async ({
    page,
  }) => {
    await myAccountPage.openAddressBook();
    await manageAddressBookPage.deleteNewAddress();

    await expect(
      page.getByText("Your address has been successfully deleted"),
    ).toBeVisible();
  });
});
