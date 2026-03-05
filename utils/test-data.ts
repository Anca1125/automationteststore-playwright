export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  fax: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  zipCode: string;
  country: string;
  loginName: string;
  password: string;
  confirmPassword: string;
}

export const generateUser = (): RegisterUser => ({
  firstName: "Anca",
  lastName: "Test",
  email: `anca_${Date.now()}@test.com`,
  telephone: "0712345678",
  fax: "1234",
  company: "PisiPlus",
  address1: "Test Street 1",
  address2: "Test Street 2",
  city: "London",
  country: "United Kingdom",
  region: "Bristol",
  zipCode: "SW1A 1AA",

  loginName: `anca_user_${Date.now()}`,
  password: "Password123!",
  confirmPassword: "Password123!",
});
