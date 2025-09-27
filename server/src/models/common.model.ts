import z from 'zod';

const MetadataCreatedModel = z.object({
  createdAt: z.date().nullable(),
  createdBy: z.string().nullable(),
});
const MetadataUpdatedModel = z.object({
  updatedAt: z.date().nullable(),
  updatedBy: z.string().nullable(),
});
const MetadataDeletedModel = z.object({
  isDeleted: z.boolean().default(false),
  deletedAt: z.date().nullable(),
  deletedBy: z.string().nullable(),
});
const MetadataModel = MetadataCreatedModel.extend(
  MetadataUpdatedModel.shape,
).extend(MetadataDeletedModel.shape);
export { MetadataModel };
