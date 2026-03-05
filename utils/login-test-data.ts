export interface LoginUser {
  username: string;
  password: string;
}

export const validLoginData: LoginUser = {
  username: "AncaEcaterina",
  password: "Ecaterina3@",
};

export const invalidLoginData = {
  nonExistingUser: {
    username: "Iliuta",
    password: "Ecaterina1!",
  },
  wrongPassword: {
    username: "EcaterinaL",
    password: "Misu123",
  },
};
export const blankLoginUsers = {
  bothBlank: {
    username: "",
    password: "",
  },
};
export const edgeCaseLoginUsers = {
  specialCharacters: {
    username: "@@@###$$$",
    password: "!@#$%^&*",
  },
  withSpaces: {
    username: " E c a t e r i n a L ",
    password: " E c a t e r i n a 1 ! ",
  },
};
