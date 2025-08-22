import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Required").email("Invalid email format"),
  password: z.string().min(1, "Required"),
});

export const signUpSchema = z
  .object({
    email: z.string().trim().min(1, "Required").email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Required"),
    brandName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
