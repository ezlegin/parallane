import z from "zod"

export const studentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),

  email: z.string().email("Please enter a valid email address."),

  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 8,
      "Password must be at least 8 characters."
    ),
})

export type StudentFormTypes = z.infer<typeof studentFormSchema>
