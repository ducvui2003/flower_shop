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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  category: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().int().positive()
  ),
  slug: z.object({
    name: z.string(),
  }),
  search: z.object({
    title: z.string(),
    metadata: z.string(),
    url: z.string(),
  }),
  thumbnailIds: z.array(z.number()).optional(),
});
type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const ProductCreatePage = () => {
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: undefined,
      price: undefined,
      priceSale: undefined,
      category: undefined,
      slug: { name: "" },
      search: {
        title: "",
        metadata: "",
        url: "",
      },
      thumbnailIds: [],
    },
  });

  const handleSubmit = async (value: FormInput) => {
    const result = formSchema.safeParse(value);

    if (!result.success) {
      logger.error(result.error.flatten());

      // optional: show toast
      toast.error("Invalid form data");

      return;
    }

    const data: FormOutput = result.data; // FormOutput
    try {
      await httpService.post("/product", data);
      toast.success("Create product success");
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
                name="search.title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title page</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Hoa tuoi "
                    />
                  </Field>
                )}
              />
              <Controller
                name="search.metadata"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Meta description</FieldLabel>
                    <Textarea {...field} aria-invalid={fieldState.invalid} />
                  </Field>
                )}
              />
              <Controller
                name="search.url"
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
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Apple</SelectItem>
                        <SelectItem value="2">Banana</SelectItem>
                        <SelectItem value="3">Blueberry</SelectItem>
                        <SelectItem value="4">Grapes</SelectItem>
                        <SelectItem value="5">Pineapple</SelectItem>
                      </SelectContent>
                    </Select>
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
