import {
  PaymentProvider,
  PaymentStatus,
  statusOrder,
  StatusOrderType,
} from '@/utils/const.util';
import { z } from 'zod';

const string = z.string().trim().min(1, 'Không được để trống trường này');

const CreateOrderFormSchema = z.object({
  name: string,
  email: string,
  phone: string,
  detail: string,
  ward: string,
  district: string,
  province: string,
  note: z.string().optional(),
  method: z.enum(['VNPAY', 'SEPAY']),
  cartItemIds: z.array(z.string()),
  feeShipping: z.number().optional(),
});

type ReceiverOrderType = {
  name: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
};

type CreateOrderReqType = {
  feeShipping: number;
  receiver: ReceiverOrderType;
  cartItemIds: string[];
  method: string;
};

type CreateOrderResType = {
  orderId: number;
  paymentId: number;
  totalAmount: number;
  url: string;
  type: 'QR_CODE' | 'REDIRECT';
};

type CreateOrderCookie = {
  req: CreateOrderReqType;
  res?: CreateOrderResType;
};

type OrderResType = {
  id: number;
  status: StatusOrderType;
  totalAmount: number;
  quantity: number;
  createdAt: Date;
};

type OrderDetailResType = {
  id: number;
  status: StatusOrderType;
  totalAmount: number;
  items: OrderDetailItemType[];
  receiver: {
    name: string;
    phone: string;
    email: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
  };
  createdAt: Date;
  payment: {
    provider: string;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt?: Date;
  };
};

type OrderDetailItemType = {
  id: number;
  productId: number;
  name: string;
  category: string;
  supplier: string;
  price: number;
  media: string;
  options?: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
};

type OrderSearchParamsType = {
  status?: StatusOrderType;
};

const OrderSearchParamsManagerSchema = z.object({
  id: z.string().optional(),
  // nameUser: z.string().optional(),
  nameReceiver: z.string().optional(),
  phoneReceiver: z.string().optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  orderStatus: z.array(z.string()).optional(),
  paymentStatus: z.array(z.string()).optional(),
});

const validStatusKeys = Object.keys(statusOrder) as [
  StatusOrderType,
  ...StatusOrderType[],
];

const OrderChangeStatusSchema = z.object({
  status: z.enum(validStatusKeys),
});

type CreateOrderFormType = z.infer<typeof CreateOrderFormSchema>;

type OrderManagerSearchParamsType = z.infer<
  typeof OrderSearchParamsManagerSchema
>;

type OrderChangeStatusType = z.infer<typeof OrderChangeStatusSchema>;

type OrderManagerResType = {
  id: number;
  status: StatusOrderType;
  totalAmount: number;
  quantity: number;
  createdAt: Date;
  receiver: {
    name: string;
    phone: string;
    email: string;
  };
  payment: {
    id: string;
    provider: PaymentProvider;
    status: PaymentStatus;
  };
};

export {
  CreateOrderFormSchema,
  OrderSearchParamsManagerSchema,
  OrderChangeStatusSchema,
};
export type {
  CreateOrderFormType,
  CreateOrderReqType,
  CreateOrderResType,
  CreateOrderCookie,
  OrderResType,
  OrderDetailResType,
  OrderSearchParamsType,
  OrderDetailItemType,
  OrderManagerResType,
  OrderManagerSearchParamsType,
  OrderChangeStatusType,
};
