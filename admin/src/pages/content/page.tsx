import { PageContentResponse } from "@/components/data-table/product/type";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import z from "zod";

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

const formSchema = z.object({
  title: z.string(),
  content: OutputDataSchema.optional(),
  metadata: z
    .object({
      title: z.string(),
      metaDescription: z.string(),
    })
    .nullable(),
  slug: z.object({
    name: z.string(),
  }),
});
type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const ContentPage = () => {
  const pageData = useLoaderData<PageContentResponse>();
  const formInitialize: FormInput = {
    title: pageData.title,
    metadata: pageData.metadata,
    content: pageData.content ?? {
      time: Date.now(),
      blocks: [],
    },
    slug: {
      name: pageData.slug,
    },
  };
  const form = useForm<FormInput>({
    defaultValues: formInitialize,
  });
  const handleSubmit = async () => {};
  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">{pageData.title}</h2>
      <Separator className="my-2" />
      <form className="pb-20" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <h3 className="text-xl font-bold">Search Engine</h3>
          <Controller
            name="metadata.title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Meta title</FieldLabel>
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
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="/"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Separator className="my-4" />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Content</FieldLabel>
              <Editor
                className="max-h-[400px]"
                value={field.value}
                onChange={(data) => {
                  field.onChange(data);
                }}
              />
            </Field>
          )}
        />
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

export default ContentPage;
