import { ProductEditing } from "@/components/data-table/product/type";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { diffObjects } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const categories = [
  { value: "1", label: "Hoa Sinh Nhật" },
  { value: "2", label: "Hoa Khai Trương" },
  { value: "3", label: "Hoa Chúc Mừng" },
];

const formSchema = z.object({
  name: z.string(),
  description: z.string().optional().default(""),
  price: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) {
      return undefined;
    }
    return Number(val);
  }, z.number().positive("Price must be greater than 0")),
  priceSale: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) {
      return undefined;
    }
    return Number(val);
  }, z.number().positive("Price must be greater than 0")),
  categories: z.array(z.number().int().positive()),
  slug: z.object({
    name: z.string(),
  }),
  metadata: z
    .object({
      title: z.string(),
      metaDescription: z.string(),
    })
    .nullable(),
  thumbnailIds: z.array(z.number()).optional(),
});
type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const ProductUpdatePage = () => {
  const product = useLoaderData<ProductEditing>();
  const formInitialize: FormInput = {
    name: product.name,
    description: product.description ?? "",
    price: product.price,
    priceSale: product.priceSale,
    categories: product.categories.map((c) => c.categoryId),
    slug: { name: product.slugPlaceholder },
    metadata: product.metadata
      ? {
          title: product.metadata.title,
          metaDescription: product.metadata.metaDescription,
        }
      : null,
    thumbnailIds: [],
  };

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      priceSale: product.priceSale,
      categories: product.categories.map((c) => c.categoryId),
      slug: { name: product.slugPlaceholder },
      metadata: product.metadata
        ? {
            title: product.metadata.title,
            metaDescription: product.metadata.metaDescription,
          }
        : null,
      thumbnailIds: [],
    },
  });

  const handleSubmit = async (value: FormInput) => {
    const result = formSchema.safeParse(value);
    if (!result.success) {
      logger.error(result.error.flatten());
      toast.error("Invalid form data");
      return;
    }

    const data: FormOutput = result.data;
    let diffData = diffObjects(data, formInitialize);
    if (Object.keys(diffData).length === 0) {
      toast.warning("No values changed");
      return;
    }
    diffData = {
      ...diffData,
      metadata: {
        ...data.metadata,
        ...diffData.metadata,
      },
    };
    logger.info(diffData);
    try {
      await httpService.patch(`/product/${product.id}`, diffData);
      toast.success("Update product success");
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.code, {
          description: e.response?.data?.message ?? "Not defined",
        });
      } else toast.error("Not define");
      logger.error(e);
    }
  };
  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Update Product</h2>
      <Separator className="my-2" />
      <form className="pb-20" onSubmit={form.handleSubmit(handleSubmit)}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Name</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex gap-4 mt-4">
          <div className="flex-3">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <Editor />
                </Field>
              )}
            />
            <Separator className="my-2" />
            <h3 className="text-xl font-bold">Media</h3>
            <Separator className="my-2" />
            <FieldGroup>
              <h3 className="text-xl font-bold">Search Engine</h3>
              <Controller
                name="metadata.title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title page</FieldLabel>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      placeholder="Hoa tuoi"
                    />
                  </Field>
                )}
              />
              <Controller
                name="metadata.metaDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Meta description</FieldLabel>
                    <Textarea
                      value={field.value}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
              <Controller
                name="slug.name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Url Handle</FieldLabel>
                    <div className="flex gap-3 items-center">
                      <span className="text-sm text-gray-900">/sanpham/</span>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="/sanpham/"
                      />
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <div className="flex-1">
            <FieldGroup>
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => {
                  const value =
                    typeof field.value === "number" ||
                    typeof field.value === "string"
                      ? field.value
                      : "";
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Price</FieldLabel>

                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
              <Controller
                name="priceSale"
                control={form.control}
                render={({ field, fieldState }) => {
                  const value =
                    typeof field.value === "number" ||
                    typeof field.value === "string"
                      ? field.value
                      : "";
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Price Sale</FieldLabel>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
              <Controller
                name="categories"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category</FieldLabel>
                    <MultiSelect
                      values={field.value.map(String)}
                      onValuesChange={(vals) =>
                        field.onChange(vals.map(Number))
                      }
                    >
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select categories..." />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        <MultiSelectGroup>
                          {categories.map((item) => (
                            <MultiSelectItem
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </MultiSelectItem>
                          ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </div>
        <div className="fixed left-1/2 flex gap-2 bg-white -translate-x-1/2 bottom-1 border-2 p-2 rounded-xl ">
          <Button type="submit" className="bg-yellow-500">
            Update
          </Button>
          <Button type="reset">Clear</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdatePage;
