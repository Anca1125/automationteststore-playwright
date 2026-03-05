export interface ManageAddressBook {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  defaultAddress: boolean;
}

export const generateEditAddressBook = (): ManageAddressBook => ({
  firstName: "Dana",
  lastName: "Ioan",
  company: "PisiPlusMinus",
  address1: "Street 1",
  address2: " Street 2",
  city: "Iasi",
  country: "United Kingdom",
  state: "Cardiff",
  postCode: "34354",
  defaultAddress: false,
});

export const generateAddNewAddressBook = (): ManageAddressBook => ({
  firstName: "Ioana",
  lastName: "Petru",
  company: "PisiPlus",
  address1: "Street 12",
  address2: " Street 22",
  city: "London",
  country: "United Kingdom",
  state: "Cardiff",
  postCode: "111111",
  defaultAddress: false,
});
