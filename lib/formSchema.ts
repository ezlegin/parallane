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
    .transform((value) => value.trim()),
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

export const membershipSchema = z.object({
  userId: z.string().min(1, "User is required"),
  paymentId: z.string().optional(),
  status: z.enum(["active", "expired"]),
  from: z.date(),
  expiresAt: z.date(),
  period: z.enum(["monthly", "annual"]),
})

export type MembershipFormValues = z.infer<typeof membershipSchema>

const lessonSchema = z.object({
  title: z.string().min(1, "Lesson title is required."),
  url: z.url(),
  type: z.enum(["video", "doc"]),
  isFree: z.boolean(),
  duration: z.string().min(0, "Duration cannot be negative."),
})

const seasonSchema = z.object({
  title: z.string().min(1, "Season title is required."),
  lessons: z.array(lessonSchema),
})

export const courseFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens."
    ),
  summary: z.string().min(1, "Summary is required."),
  description: z.string().min(1, "Description is required."),
  category: z.enum(["webDesign", "frontEnd", "backEnd"]),
  status: z.enum(["published", "draft"]),
  audience: z.array(
    z.object({
      value: z.string().min(1, "Audience item cannot be empty."),
    })
  ),
  seasons: z.array(seasonSchema),
  tizerUrl: z.url(),
  duration: z.string().min(0),
})

export type CourseFormType = z.infer<typeof courseFormSchema>

export const enrollmentFormSchema = z.object({
  userId: z.string().min(1, "User is required"),
  courseId: z.string().min(1, "Course is required"),
  enrolledAt: z.date(),
})

export type EnrollmentFormType = z.infer<typeof enrollmentFormSchema>

export const adminProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name is too long."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 8,
      "Password must be at least 8 characters."
    ),
})

export type AdminProfileFormType = z.infer<typeof adminProfileFormSchema>

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(2, "Please enter a subject."),
  message: z.string().min(10, "Please enter at least 10 characters."),
})

export type ContactFormType = z.infer<typeof contactFormSchema>

export const contactResponseFormSchema = z.object({
  message: z.string().min(3),
})

export type ContactResponseFormType = z.infer<typeof contactResponseFormSchema>

export const checkoutSchemaSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  city: z.string().trim().min(1, "City is required."),
  phoneNumber: z
    .string()
    .trim()
    .min(5, "Please enter a valid phone number.")
    .max(25, "Phone number is too long."),
  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required.")
    .max(20, "Postal code is too long."),
  address: z.string().trim().min(3, "Address is required."),
})

export type CheckoutFormType = z.infer<typeof checkoutSchemaSchema>
