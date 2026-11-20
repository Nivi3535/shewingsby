import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug must be lowercase, words separated by hyphens"),
  description: z.string().trim().nullable().optional(),
  image: z.string().trim().nullable().optional(),
  parentId: z.string().trim().nullable().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
