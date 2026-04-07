export interface GuestUser {
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
  postCode: string;
  country: string;
}

export const generateGuestUser = (): GuestUser => ({
  firstName: "Mishu",
  lastName: "Iliuta",
  email: `mishu.iliuta_${Date.now()}@test.com`,
  telephone: "0987654321",
  fax: "02315",
  company: "PisiPlus",
  address1: "strada Principala",
  address2: "strada Secundara",
  city: "London",
  region: "Bristol",
  postCode: "SW1A 1AA",
  country: "United Kingdom",
});
