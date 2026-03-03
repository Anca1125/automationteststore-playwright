export interface ForgotPasswordData {
  loginName: string;
  email: string;
}

export const validForgotPasswordData: ForgotPasswordData = {
  loginName: "EcaterinaL",
  email: "caty@luca.com",
};
export const invalidForgotPasswordData = {
  nonExistingData: {
    loginName: "Loredana",
    email: "iliuta@misu.com",
  } as ForgotPasswordData,
  invalidFormat: {
    loginName: "Loredana",
    email: "not-a-email",
  } as ForgotPasswordData,
};

export const blankForgotPasswordData = {
  bothBlank: {
    loginName: "",
    email: "",
  } as ForgotPasswordData,
};
