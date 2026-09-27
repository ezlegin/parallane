import z from "zod"

export const studentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),

  email: z.email("Please enter a valid email address."),

  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 8,
      "Password must be at least 8 characters."
    ),
})

export type StudentFormTypes = z.infer<typeof studentFormSchema>

export const couponSchema = z.object({
  code: z
    .string()
    .min(1, "Coupon code is required")
    .max(50, "Coupon code is too long")
    .transform((value) => value.trim().toUpperCase()),
  type: z.enum(["fixed", "percentage"]),
  amount: z.string(),
  expiresAt: z.date(),
  usageLimit: z.string(),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(200, "Summary is too long"),
})

export type CouponFormValues = z.infer<typeof couponSchema>
