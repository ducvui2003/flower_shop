"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  metadataEntries: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string(),
    }),
  ),
});

type FormInput = z.input<typeof formSchema>;

type DialogUpdateMediaProps = {
  id: number;
  metadata?: Record<string, unknown> | null;
  onSuccess?: () => void;
};

const DialogUpdateMedia = ({
  id,
  metadata,
  onSuccess,
}: DialogUpdateMediaProps) => {
  const [open, setOpen] = useState(false);

  const initialMetadataEntries = useMemo(
    () =>
      Object.entries(metadata ?? {}).map(([key, value]) => ({
        key,
        value: String(value ?? ""),
      })),
    [metadata],
  );

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadataEntries: initialMetadataEntries,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({ metadataEntries: initialMetadataEntries });
    }
  }, [open, initialMetadataEntries, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "metadataEntries",
  });

  const handleSubmit = async (value: FormInput) => {
    const result = formSchema.safeParse(value);
    if (!result.success) {
      logger.error(result.error.flatten());
      toast.error("Invalid form data");
      return;
    }

    // Convert array of entries to record
    const metadata = result.data.metadataEntries.reduce(
      (acc, { key, value }) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    const data = { metadata };
    try {
      await httpService.put(`/media/${id}`, data);
      toast.success("Update media metadata success");
      setOpen(false);
      form.reset({ metadataEntries: initialMetadataEntries });
      onSuccess?.();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:cursor-pointer">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Media Metadata</DialogTitle>
          <DialogDescription>
            Update the metadata key-value pairs for this media file.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <FieldLabel>Metadata Key-Value Pairs</FieldLabel>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => append({ key: "", value: "" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Pair
                </Button>
              </div>

              {fields.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-md">
                  No metadata entries. Click "Add Pair" to add a new entry.
                </div>
              )}

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <Controller
                    name={`metadataEntries.${index}.key`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="flex-1"
                      >
                        <Input
                          placeholder="Key"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name={`metadataEntries.${index}.value`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="flex-1"
                      >
                        <Input
                          placeholder="Value"
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="mt-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </FieldGroup>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500">
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateMedia;
