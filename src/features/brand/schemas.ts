import { z } from "zod";

export const brandStep1Schema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
  founded: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  employees: z.string().min(1, "Please select company size"),
  revenue: z.string().min(1, "Please select revenue range"),
});

export const brandStep2Schema = z.object({
  socialMedia: z.object({
    facebook: z.object({
      connected: z.boolean(),
      accountName: z.string().optional(),
    }),
    instagram: z.object({
      connected: z.boolean(),
      accountName: z.string().optional(),
    }),
    twitter: z.object({
      connected: z.boolean(),
      accountName: z.string().optional(),
    }),
    linkedin: z.object({
      connected: z.boolean(),
      accountName: z.string().optional(),
    }),
  }),
  location: z.object({
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    province: z.string().min(2, "Province must be at least 2 characters"),
  }),
});

export const brandStep3Schema = z.object({
  documents: z.object({
    panNumber: z.string().optional(),
    vatNumber: z.string().optional(),
    companyRegistration: z.string().optional(),
    registrationNumber: z.string().optional(),
  }),
});

export const brandStep4Schema = z.object({
  adminUsers: z
    .array(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email"),
        role: z.string().min(2, "Role must be at least 2 characters"),
        phone: z.string().min(10, "Please enter a valid phone number"),
        isPrimary: z.boolean(),
      })
    )
    .min(1, "At least one admin user is required"),
});

export const completeBrandSchema = brandStep1Schema
  .merge(brandStep2Schema)
  .merge(brandStep3Schema)
  .merge(brandStep4Schema);

export type BrandStep1Data = z.infer<typeof brandStep1Schema>;
export type BrandStep2Data = z.infer<typeof brandStep2Schema>;
export type BrandStep3Data = z.infer<typeof brandStep3Schema>;
export type BrandStep4Data = z.infer<typeof brandStep4Schema>;
export type CompleteBrandData = z.infer<typeof completeBrandSchema>;
