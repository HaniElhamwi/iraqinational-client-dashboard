import { object, string, minLength, type Output, email } from 'valibot';

export const LoginFormSchema = object({
  email: string([email()]),
  password: string([minLength(6)]),
});

export type LoginFormData = Output<typeof LoginFormSchema>;
