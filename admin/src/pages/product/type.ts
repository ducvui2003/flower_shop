import z from "zod";

type Category = {
  id: number;
  name: string;
  href: string;
  thumbnail: {
    src: string;
    alt: string;
  } | null;
};

const OutputDataSchema = z.object({
  time: z.number().optional(),
  version: z.string().optional(),
  blocks: z.array(
    z.object({
      id: z.string().optional(),
      type: z.string(),
      data: z.unknown(),
    }),
  ),
});

const ProductFormSchema = z
  .object({
    name: z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) {
          return "";
        }
        return val;
      },
      z.string().min(1, "Name is required"),
    ),
    description: OutputDataSchema.optional(),
    price: z.preprocess((val) => {
      if (val === "" || val === null || val === undefined) {
        return Number(0);
      }
      return Number(val);
    }, z.number().positive("Price must be greater than 0")),
    priceSale: z.preprocess((val) => {
      if (val === "" || val === null || val === undefined) {
        return Number(0);
      }
      return Number(val);
    }, z.number().positive("Price must be greater than 0")),
    categories: z
      .array(z.number().int().positive())
      .min(1, "Please choose at least 1 category"),
    slug: z.object({
      name: z.string().nonempty("Slug is required"),
    }),
    metadata: z
      .object({
        title: z.string(),
        metaDescription: z.string(),
      })
      .nullable(),
    images: z
      .array(
        z.object({
          id: z.number(),
          key: z.string(),
          href: z.string(),
          alt: z.string(),
        }),
      )
      .optional(),
    thumbnailId: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.priceSale && data.price) {
        return data.priceSale < data.price;
      }
      return true;
    },
    {
      message: "Price sale must be less than price",
      path: ["priceSale"],
    },
  );

type ProductFormInput = z.input<typeof ProductFormSchema>;
type ProductFormOutput = z.output<typeof ProductFormSchema>;

export type { Category, ProductFormInput, ProductFormOutput };
export { ProductFormSchema };
