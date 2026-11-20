import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug must be lowercase, words separated by hyphens"),
  description: z.string().trim().nullable().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative").default(10),
  categoryId: z.string().trim().min(1, "Category is required"),
});

export type ProductInput = z.infer<typeof productSchema>;
