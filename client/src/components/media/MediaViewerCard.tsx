import {
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemProgress,
} from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

type MediaViewerCardProps = {
  id: string;
  url?: string;
  name: string;
  checked?: boolean;
  file?: File;
  onChecked?: (checked: boolean) => void;
};

const MediaViewerCard = ({
  url,
  checked = false,
  file,
  id,
  name,
  onChecked,
}: MediaViewerCardProps) => {
  if (file)
    return (
      <FileUploadItem key={id} value={file} className="justify-between">
        <FileUploadItemPreview className="w-full flex-1" />
        <FileUploadItemProgress />
      </FileUploadItem>
    );

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onChecked?.(checked);
  };

  return (
    <div className="border-accent relative aspect-square rounded-xl border-2 p-1">
      <Input
        type="checkbox"
        defaultChecked={checked}
        onChange={handleChecked}
        data-media-id={id}
        className="absolute top-1 right-1 size-5"
      />
      <img src={url} className="size-full rounded-xl bg-white object-center" />
      <div className="text-center">
        <span className="block truncate text-xs">{name}</span>
      </div>
    </div>
  );
};
export default MediaViewerCard;
