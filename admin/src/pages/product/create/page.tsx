import DialogGetImage from "@/components/dialog/dialog-get-image";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const categories = [
  { value: "1", label: "Hoa Sinh Nhật" },
  { value: "2", label: "Hoa Khai Trương" },
  { value: "3", label: "Hoa Chúc Mừng" },
];

const OutputDataSchema = z.object({
  time: z.number().optional(),
  version: z.string().optional(),
  blocks: z.array(
    z.object({
      id: z.string().optional(),
      type: z.string(),
      data: z.unknown(),
    })
  ),
});

const formSchema = z.object({
  name: z.string(),
  description: OutputDataSchema,
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
    name: z.string().nonempty(),
  }),
  metadata: z.object({
    title: z.string(),
    metaDescription: z.string(),
  }),
  images: z
    .array(
      z.object({
        id: z.number(),
        key: z.string(),
        href: z.string(),
        alt: z.string(),
      })
    )
    .optional(),
});
type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const ProductCreatePage = () => {
  const navigate = useNavigate();
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: {
        time: Date.now(),
        blocks: [],
      },
      price: undefined,
      priceSale: undefined,
      categories: [],
      slug: { name: "" },
      metadata: {
        title: "",
        metaDescription: "",
      },
      images: [],
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
    try {
      await httpService.post("/product", {
        ...data,
        description: JSON.stringify(data.description),
      });
      toast.success("Create product success");
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
      <h2 className="text-2xl font-bold">Create Product</h2>
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
            <h3 className="text-xl font-bold mb-5">Media</h3>
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
                          <X
                            className="absolute top-0 right-0 text-sm hover:opacity-70 text-red-500 cursor-pointer"
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((i) => item.id !== i.id)
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
                      aria-invalid={fieldState.invalid}
                      placeholder="Hoa tuoi "
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="metadata.metaDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Meta description</FieldLabel>
                    <Textarea {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
          <Button type="submit" className="bg-green-500">
            Create
          </Button>
          <Button type="reset">Clear</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreatePage;
