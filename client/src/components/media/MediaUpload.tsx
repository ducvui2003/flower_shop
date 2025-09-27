'use client';

import { Button } from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import * as React from 'react';
import { toast } from 'sonner';

type MediaFileUploadProps = {
  onValueChange: (files: File[]) => void;
  onUpload: (
    files: File[],
    options: {
      onProgress: (file: File, progress: number) => void;
      onSuccess: (file: File) => void;
      onError: (file: File, error: Error) => void;
    },
  ) => void;
  children?: React.ReactNode;
};

export function MediaFileUpload({
  children,
  onValueChange,
  onUpload,
}: MediaFileUploadProps) {
  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);

  return (
    <FileUpload
      maxSize={5 * 1024 * 1024}
      className="w-full"
      onUpload={onUpload}
      onValueChange={(files) => onValueChange(files)}
      onFileReject={onFileReject}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Multiply file (up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      {children}
    </FileUpload>
  );
}
