type MediaType = {
  id: string;
  url?: string;
  publicId: string;
};

type MediaSearchParams = {
  skipIds?: number[];
};

type MediaUploading = Omit<MediaType, 'url'> & {
  file?: File;
};

type UploadSignature = {
  publicId: string;
  folder: string;
};

type UploadSignatureResult = {
  timestamp: number;
  properties: SignatureProperties[];
  apiKey: string;
};

type SignatureProperties = UploadSignature & {
  signature: string;
};

type CloudinaryUploadResult = {
  public_id: string;
  signature: string;
  resource_type: string;
  format: string;
  url: string;
};

type CreateMediaReqType = {
  publicId: string;
  type: string;
  format: string;
};

type CreatedMediaResType = {
  publicId: string;
  type: string;
  format: string;
  id: number;
};

type PagingMediaType = CreatedMediaResType & {
  url: string;
};

export type {
  MediaType,
  MediaUploading,
  UploadSignature,
  UploadSignatureResult,
  SignatureProperties,
  CreateMediaReqType,
  CreatedMediaResType,
  CloudinaryUploadResult,
  PagingMediaType,
  MediaSearchParams,
};
