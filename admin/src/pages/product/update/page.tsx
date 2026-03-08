import { Image, ProductEditing } from "@/components/data-table/product/type";
import DialogGetImage from "@/components/dialog/dialog-get-image";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn, diffObjects } from "@/lib/utils";
import {
  Category,
  ProductFormInput,
  ProductFormOutput,
  ProductFormSchema,
} from "@/pages/product/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { X } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";

const ProductUpdatePage = () => {
  const navigate = useNavigate();
  const data = useLoaderData<{
    product: ProductEditing & {
      images?: Array<Image>;
    };
    categories: Array<Category>;
  }>();

  const product = data.product;
  const categories = data.categories;

  const formInitialize: ProductFormInput = {
    name: product.name,
    description: product.description ?? {
      time: Date.now(),
      blocks: [],
    },
    price: product.price,
    priceSale: product.priceSale,
    categories: product.categoryIds,
    slug: { name: product.slugPlaceholder },
    metadata: product.metadata,
    images: product.images,
    thumbnailId: product.thumbnailId,
  };

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      priceSale: product.priceSale,
      categories: product.categoryIds,
      slug: { name: product.slugPlaceholder },
      metadata: product.metadata
        ? {
            title: product.metadata.title,
            metaDescription: product.metadata.metaDescription,
          }
        : null,
      images: product.images,
      thumbnailId: product.thumbnailId,
    },
  });

  const thumbnail = useWatch({
    control: form.control,
    name: "thumbnailId",
  });

  const handleSubmit = async (value: ProductFormInput) => {
    console.log("submit");
    const result = ProductFormSchema.safeParse(value);
    if (!result.success) {
      logger.error(result.error.flatten());
      toast.error("Invalid form data");
      return;
    }

    const data: ProductFormOutput = result.data;
    let diffData = diffObjects(data, formInitialize);
    if (Object.keys(diffData).length === 0) {
      toast.warning("No values changed");
      return;
    }
    diffData = {
      ...diffData,
      images: (diffData.images as Array<Image> | undefined)?.map((i) => i.id),
      metadata: {
        ...data.metadata,
        ...diffData.metadata,
      },
    };
    logger.info(diffData);
    try {
      await httpService.patch(`/admin/product/${product.id}`, diffData);
      toast.success("Update product success");
      navigate("/product", { replace: true });
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
              <Input
                {...field}
                value={field.value as string}
                aria-invalid={fieldState.invalid}
              />
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
                  <Editor
                    value={field.value}
                    onChange={(data) => {
                      field.onChange(data);
                    }}
                  />
                </Field>
              )}
            />
            <Separator className="my-2" />
            <Controller
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Images</FieldLabel>
                  <DialogGetImage {...field} className="w-full">
                    <div className="w-full grid place-items-center h-20 border-dotted border-2 border-gray-400 bg-gray-100 rounded">
                      <Button type="button" className="bg-green-500">
                        Choose Image
                      </Button>
                    </div>
                  </DialogGetImage>

                  <div className="grid mt-4 grid-cols-6 gap-4">
                    {field.value?.map((item, i) => (
                      <div
                        key={item.id}
                        className={cn(i === 0 && "row-span-1")}
                      >
                        <div className="p-4 relative rounded shadow w-fit bg-gray-50">
                          <Checkbox
                            className="absolute top-2 left-2 bg-gray-300"
                            checked={item.id === thumbnail}
                            onCheckedChange={() =>
                              form.setValue("thumbnailId", item.id, {
                                shouldDirty: true,
                                shouldValidate: true,
                              })
                            }
                          />
                          <X
                            className="absolute top-0 right-0 text-sm hover:opacity-70 text-red-500 cursor-pointer"
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((i) => item.id !== i.id),
                              )
                            }
                          />
                          <img
                            src={item.href}
                            className="aspect-square object-contain"
                            alt={item.alt}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Field>
              )}
            />

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
                              key={item.id}
                              value={item.id.toString()}
                            >
                              #{item.id} {item.name}
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
