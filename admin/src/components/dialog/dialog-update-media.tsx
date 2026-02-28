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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  metadata: z.record(z.string(), z.string()),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

type DialogUpdateMediaProps = {
  id: number;
  onSuccess?: () => void;
};

const DialogUpdateMedia = ({ id, onSuccess }: DialogUpdateMediaProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: {},
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
      await httpService.put(`/media/${id}`, data);
      toast.success("Update media metadata success");
      setOpen(false);
      form.reset();
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
              <Controller
                name="metadata"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Metadata (JSON)</FieldLabel>
                    <Input
                      placeholder='{"key": "value"}'
                      value={JSON.stringify(field.value)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          field.onChange(parsed);
                        } catch {
                          // Keep the current value if JSON is invalid
                        }
                      }}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
