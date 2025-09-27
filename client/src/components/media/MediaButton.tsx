import ClientIcon from '@/components/ClientIcon';
import MediaCard from '@/components/media/MediaCard';
import { useMediaContext } from '@/components/media/MediaContext';
import { cn } from '@/lib/utils';
import { MediaType } from '@/types/media.type';

type MediaButtonProps = {
  className?: string;
  expose?: (resources: MediaType[]) => void;
  previewImage?: boolean;
  initialValue?: string;
};

const MediaButton = ({ className }: MediaButtonProps) => {
  const { handleOpenDialog, preview, previewMode } = useMediaContext();
  return (
    <>
      {previewMode && preview?.url ? (
        <MediaCard
          url={preview.url}
          onClick={() => handleOpenDialog()}
          className={cn('size-[100px] hover:cursor-pointer', className)}
        />
      ) : (
        <div
          onClick={() => handleOpenDialog()}
          className={cn(
            'border-accent grid aspect-square size-[80px] items-center rounded-xl border-2 bg-gray-200 hover:cursor-pointer hover:bg-gray-300',
            className,
          )}
        >
          <ClientIcon icon={'mdi:image-add-outline'} />
        </div>
      )}
    </>
  );
};

export default MediaButton;
