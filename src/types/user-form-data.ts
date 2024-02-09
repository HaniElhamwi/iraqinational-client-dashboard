import { object, number, string, optional, minLength, toTrimmed, type Output, date, any, required, boolean } from 'valibot';

export const UserFormSchema = object({
  id: any(),
  username: string(),
  companyName: string(),
  companyTaxNumber: string(),
  phoneNumber: optional(string()),
  website: optional(any()),
  email: string(),
  role: string(),
  verified: boolean(),
  isDisabled: boolean(),
});

export type UserFormData = Output<typeof UserFormSchema>;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SELLER = 'seller',
}
