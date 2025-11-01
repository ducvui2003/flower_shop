import z from 'zod';

export const CommentSchema = z.object({
  content: z.string().min(1).max(500),
  parentId: z.string().uuid().optional(),
  product: z.number(),
});

export const CommentUpdateSchema = z.object({
  content: z.string().min(1).max(500),
  commentId: z.string().uuid(),
});

export const CommentResponseSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  likes: z.number(),
  parentId: z.string().uuid().optional(),
  createAt: z.date(),
  username: z.string(),
});

export type CommentRequest = z.infer<typeof CommentSchema>;
export type CommentUpdateRequest = z.infer<typeof CommentUpdateSchema>;
export type CommentResponse = z.infer<typeof CommentResponseSchema>;
