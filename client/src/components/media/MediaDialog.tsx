'use client';
import ClientIcon from '@/components/ClientIcon';
import InfiniteScrollList from '@/components/InfinityScrollList';
import { useMediaContext } from '@/components/media/MediaContext';
import { MediaFileUpload } from '@/components/media/MediaUpload';
import MediaViewerCard from '@/components/media/MediaViewerCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLazyGetPagingMediaQuery } from '@/features/media/media.api';
import { nanoId, uuid } from '@/lib/utils';
import mediaService from '@/service/media.service';
import { MediaType, MediaUploading } from '@/types/media.type';
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

type MediaDialogProps = {
  expose?: (resources: MediaType[]) => void;
  children?: ReactNode;
  multiple: boolean;
};

const MediaDialog = ({ multiple, expose }: MediaDialogProps) => {
  const [filesUploading, setFilesUploading] = useState<MediaUploading[]>([]);
  const DEFAULT_SIZE = useRef<number>(8);
  const {
    selectedImages,
    selectImages,
    openDialog,
    handleCloseDialog,
    previewMode,
    setPreview,
  } = useMediaContext();
  const [medias, setMedias] = useState<MediaType[]>(() => {
    console.log('setstate', selectImages);
    return selectedImages ?? [];
  });
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('selectedImages', selectedImages);
  }, [selectedImages]);

  const [trigger] = useLazyGetPagingMediaQuery();

  const loadFunc = async (
    page: number,
  ): Promise<{ data: (MediaType | MediaUploading)[]; more: boolean }> => {
    const result = await trigger({
      page: page,
      size: DEFAULT_SIZE.current,
      skipIds: selectedImages.map((item) => Number(item.id)),
    }).unwrap();
    return {
      data: result.items.map((item) => {
        return {
          id: item.id.toString(),
          publicId: item.publicId,
          url: item.url,
        };
      }),
      more: result.pagination.page < result.pagination.totalPages,
    };
  };

  const handleUpload = useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        const signaturePromises = await mediaService.sign(
          files.map((file) => ({
            folder: 'test',
            publicId: file.name.split('.')[0] + nanoId(8),
          })),
        );

        const uploadPromises = files.map(async (file, index) => {
          try {
            console.log('Preparing upload for', file.name);

            // Simulate file upload with progress
            const totalChunks = 10;
            let uploadedChunks = 0;

            // Simulate chunk upload with delays
            for (let i = 0; i < totalChunks; i++) {
              // Simulate network delay (100-300ms per chunk)
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100),
              );

              // Update progress for this specific file
              uploadedChunks++;
              const progress = (uploadedChunks / totalChunks) * 100;
              onProgress(file, progress);
            }
            const result = await mediaService.uploadFileToCloudinary(file, {
              apiKey: signaturePromises.apiKey,
              folder: signaturePromises.properties[index].folder,
              signature: signaturePromises.properties[index].signature,
              timestamp: signaturePromises.timestamp,
              publicId: signaturePromises.properties[index].publicId,
            });
            const response = await mediaService.createMedia({
              format: result.format,
              publicId: result.public_id,
              type: result.resource_type,
            });

            if (response) {
              setFilesUploading((prev) => [
                {
                  id: response.id.toString(),
                  publicId: response.publicId,
                  url: result.url,
                },
                ...prev.filter((item) => !item.file),
              ]);
            }
            toast.success(`Upload Success`, {
              description: response.publicId,
            });
            onSuccess(file);

            return {
              resourceId: response.id,
              url: result.url,
            };
          } catch (error) {
            toast.error(`Upload Failed`);
            onError(
              file,
              error instanceof Error ? error : new Error('Upload failed'),
            );
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error('Unexpected error during upload:', error);
        toast.success('Upload failed');
      }
    },
    [],
  );

  const handleFileChange = useCallback((files: File[]) => {
    setFilesUploading((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: uuid(),
        publicId: file.name,
        file: file,
      })),
    ]);
  }, []);

  const handleSelect = (checked: boolean, media: MediaType) => {
    if (checked) {
      setMedias((prev) => [
        ...prev,
        {
          id: media.id,
          publicId: media.publicId,
          url: media.url,
        },
      ]);
    } else {
      setMedias((prev) => [...prev.filter((item) => item.id != media.id)]);
    }
  };

  const handleSubmit = () => {
    if (!multiple && medias.length > 1) {
      toast.message('Vui lòng chọn 1 ảnh');
      return;
    }
    selectImages(medias);
    if (previewMode) {
      setPreview(medias[0]);
    }
    expose?.(medias);
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>Chọn file</DialogTitle>
        </DialogHeader>

        <div className="flex">
          <Input type="text" className="flex-1" />
          <div className="flex-1">
            <Button className="ml-auto flex items-center p-1">
              <ClientIcon icon={'fluent-mdl2:sort'} size={20} />
              Sort
            </Button>
          </div>
        </div>
        <MediaFileUpload
          onUpload={handleUpload}
          onValueChange={handleFileChange}
        >
          <ScrollArea className="h-[40vh]" ref={viewRef}>
            <InfiniteScrollList<MediaType | MediaUploading>
              initialValue={selectedImages}
              loadFunc={loadFunc}
              className="grid grid-cols-5 gap-4"
              refViewport={viewRef}
              render={(item, index) => {
                return (
                  <MediaViewerCard
                    {...item}
                    key={`${item.id}-${index}`}
                    name={item.publicId}
                    checked={medias.some((i) => i.id === item.id)}
                    onChecked={(checked) => handleSelect(checked, item)}
                  />
                );
              }}
              loading={<div style={{ color: 'red' }}>Loading...</div>}
              fallback={<div>No item</div>}
            />
          </ScrollArea>
          <div className="flex gap-2">
            <Button type="button" onClick={handleSubmit}>
              Ok
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </div>
        </MediaFileUpload>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MediaDialog);
