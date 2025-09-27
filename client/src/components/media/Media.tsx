'use client';
import MediaButton from '@/components/media/MediaButton';
import { MediaProvider } from '@/components/media/MediaContext';
import MediaDialog from '@/components/media/MediaDialog';
import { MediaType } from '@/types/media.type';
type MediaProps = {
  className?: string;
  expose?: (resources: MediaType[]) => void;
  previewMode?: boolean;
  multiple?: boolean;
  initialValue?: MediaType[] | MediaType;
};

const Media = ({
  className,
  expose,
  previewMode = false,
  initialValue,
  multiple = false,
}: MediaProps) => {
  return (
    <MediaProvider previewMode={previewMode} initValue={initialValue}>
      <MediaButton className={className} expose={expose} />
      <MediaDialog
        multiple={multiple}
        expose={(resources) => {
          expose?.(resources);
        }}
      />
    </MediaProvider>
  );
};

export default Media;
