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
  data: Page<T>;
  message: string;
};

type Page<T> = {
  items: Array<T>;
  isLast: boolean;
  totalItems: number;
  currentPage: number;
  totalPages: number;
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

export type { ResponseApi, ResponseApiPaging, Page, PageReq };
