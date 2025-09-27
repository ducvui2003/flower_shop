import z, { number, string } from 'zod';

const AddCartItemSchema = z.object({
  productId: number().int().positive(),
  hasOption: z.boolean().optional(),
  optionId: number({
    required_error: "Vui lòng chọn dung tích",
  }).int().positive().optional(),
  quantity: number().int().positive(),
}).strict().superRefine((data, ctx) => {
  if (data.hasOption && !data.optionId) {
    ctx.addIssue({
      path: ['optionId'],
      code: z.ZodIssueCode.custom,
      message: 'Vui lòng chọn dung tích',
    });
  }
});

const ChangeQuantityCartItemSchema = z.object({
  quantity: z.union([
    z.number().int().positive(),
    z.object({ increment: z.number().int().positive() }),
    z.object({ decrement: z.number().int().positive() }),
  ]),
}).strict();

export {AddCartItemSchema, ChangeQuantityCartItemSchema}