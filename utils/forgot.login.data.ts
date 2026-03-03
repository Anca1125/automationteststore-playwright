export interface ForgotLoginData {
  lastName: string;
  email: string;
}

export const validForgotYourLogin: ForgotLoginData = {
  lastName: "Luca",
  email: "caty@luca.com",
};

export const invalidForgotYourLogin = {
  wrongLastName: {
    lastName: "Matei",
    email: "caty@luca.com",
  } as ForgotLoginData,
  invalidEmail: {
    lastName: "Luca",
    email: "this-is-not-email",
  } as ForgotLoginData,
};

export const blankFields = {
  bothBlank: { lastName: "", email: "" } as ForgotLoginData,
};
