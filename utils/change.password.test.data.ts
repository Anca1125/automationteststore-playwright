export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
export const validPassword = {
  currentPassword: "Ecaterina3@",
  newPassword: "Ecaterina1@",
  newPasswordConfirm: "Ecaterina1@",
} as ChangePassword;

export const invalidCurrentPassword = {
  currentPassword: "Ecaterina",
  newPassword: "Ecaterin4@",
  newPasswordConfirm: "Ecaterina4@",
} as ChangePassword;

export const invalidConfirmNewPassword = {
  currentPassword: "Ecaterina3@",
  newPassword: "Password123",
  newPasswordConfirm: "SomethingElse12345567",
} as ChangePassword;

export const tooLongPassword = {
  currentPassword: "Ecaterina3@",
  newPassword: "A".repeat(40),
  newPasswordConfirm: "A".repeat(40),
} as ChangePassword;

export const emptyFields = {
  currentPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
} as ChangePassword;
