import { z } from "zod";

const minLengthErrorMessage = "Password must be at least 8 characters long";
const maxLengthErrorMessage = "Password must be at most 20 characters long";
const uppercaseErrorMessage = "Password must contain at least one uppercase letter";
const lowercaseErrorMessage = "Password must contain at least one lowercase letter";
const numberErrorMessage = "Password must contain at least one number";
const specialCharacterErrorMessage = "Password must contain at least one special character";
const passwordMismatchErrorMessage = "Passwords do not match";
 
const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*_-]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordMismatchErrorMessage,
    path: ['confirmPassword'],
  });

export const formSchema = z
  .object({
    token: z.string(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
