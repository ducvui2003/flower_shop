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
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { diffObjects } from "@/lib/utils";
import { OutputData } from "@editorjs/editorjs";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router";
import { toast } from "sonner";
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

const setDefaultContentEditor = (value: string): OutputData => {
  if (!value || value === "{}") {
    return {
      time: Date.now(),
      blocks: [],
    };
  }
  return JSON.parse(value) as OutputData;
};

const ContentPage = () => {
  const { page } = useParams();
  const pageData = useLoaderData<PageContentResponse>();
  const formInitialize: FormInput = {
    title: pageData.title,
    metadata: pageData.metadata ?? {
      title: "",
      metaDescription: "",
    },
    content: setDefaultContentEditor(pageData.content),
    slug: {
      name: pageData.slug,
    },
  };
  logger.debug(pageData);
  const form = useForm<FormInput>({
    defaultValues: formInitialize,
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
    diffData["content"] = JSON.stringify(diffData["content"]);
    logger.debug(diffData);
    try {
      await httpService.patch(`/page/${page}`, diffData);
      toast.success(`Update ${page} success`);
      // navigate("/content", { replace: true });
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.code, {
          description: e.response?.data?.message ?? "Not defined",
        });
      } else toast.error("Not define");
      logger.error(e);
    }
  };
  useEffect(() => {
    form.reset(formInitialize);
  }, [pageData]);
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
        <div className="fixed left-1/2 flex gap-2 bg-white -translate-x-1/2 bottom-1 border-2 p-2 rounded-xl z-50">
          <Button type="submit" className="bg-green-500">
            Update
          </Button>
          <Button type="reset">Clear</Button>
        </div>
      </form>
    </div>
  );
};

export default ContentPage;
