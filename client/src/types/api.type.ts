type ResponseApi<T> = {
  code: number;
  data: T & {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: Date | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    deletedBy?: string | undefined;
  };
  message: string;
};

type ResponseApiPaging<T> = {
  status: number;
  data: Paging<T>;
  message: string;
};

type Paging<T> = {
  items: (T & Metadata)[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

type Metadata = {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
};

type PageReq<T = object> = {
  page: number;
  size: number;
  sorts?: string[];
} & T;

export type { ResponseApi, ResponseApiPaging, Paging, PageReq };
