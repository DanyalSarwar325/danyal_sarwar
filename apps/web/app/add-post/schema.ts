import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters')
    .trim(),
  body: z
    .string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must be less than 10,000 characters')
    .trim(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

