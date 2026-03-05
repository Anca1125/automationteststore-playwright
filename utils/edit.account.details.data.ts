export interface EditAccountData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  fax: string;
}

export const validData = {
  firstName: "Ecaterina Anca",
  lastName: "Matei",
  email: "anca@test.com",
  telephone: "0798765234",
  fax: "9876",
} as EditAccountData;
export const invalidEmail = {
  firstName: "Ecaterina Anca",
  lastName: "Matei",
  email: "anca-test-com",
  telephone: "0798765234",
  fax: "9876",
} as EditAccountData;

export const tooLongName = {
  firstName: "A".repeat(40),
  lastName: "B".repeat(40),
  email: "anca@test.com",
  telephone: "0798765234",
  fax: "9876",
} as EditAccountData;

export const blankFields = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  fax: "",
} as EditAccountData;
