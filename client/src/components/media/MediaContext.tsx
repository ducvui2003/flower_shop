'use client';
import { DEFAULT_IMAGE_PRODUCT } from '@/utils/const.util';
import { MediaType } from '@/types/media.type';
import { StaticImageData } from 'next/image';
import { createContext, ReactNode, useContext, useState } from 'react';

type MediaContextType = {
  selectedImages: MediaType[];
  selectImages: (img: MediaType[]) => void;
  openDialog?: boolean;
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;
  previewMode: boolean;
  preview?: MediaType;
  setPreview: (media: MediaType) => void;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaDialog must be used inside MediaDialogProvider');
  }
  return context;
};

type MediaProviderProps = {
  children: ReactNode;
  initValue?: MediaType[] | MediaType;
  previewMode?: boolean;
  fallbackUrl?: string | StaticImageData;
};

export const MediaProvider = ({
  children,
  initValue = [],
  previewMode = false,
}: MediaProviderProps) => {
  const [selectedImages, setSelectedImages] = useState<MediaType[]>(
    Array.isArray(initValue) ? initValue : [initValue],
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const [preview, setPreview] = useState<MediaType>(
    Array.isArray(initValue) ? initValue[0] : initValue,
  );
  const selectImages = (img: MediaType[]) => {
    setSelectedImages(img);
  };

  return (
    <MediaContext.Provider
      value={{
        selectedImages,
        selectImages,
        openDialog,
        handleOpenDialog,
        handleCloseDialog,
        previewMode,
        preview,
        setPreview,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
