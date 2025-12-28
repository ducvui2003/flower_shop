import { Source } from '@/types/common.type';

export const HOME_PAGE: string = '/';
export const LOGIN_PAGE: string = '/login';
export const HTTP_STATUS_CODE = {
  BAD_STATUS_REQUEST: 400,
  ENTITY_ERROR_STATUS_CODE: 422,
  UNAUTHORIZED: 401,
  SUCCESS: 200,
} as const;

export const LOCAL_STORAGE = {
  LOGOUT: 'logout-action',
} as const;

export const ALT = 'Hoa Tươi Nhật Nam';
export const DESCRIPTION = '';
export const DEFAULT_IMAGE_PRODUCT: Source & {
  alt: string;
} = {
  src: '/images/product.jpg',
  alt: 'DEFAULT_IMAGE_PRODUCT',
};
export const DEFAULT_IMAGE_CATEGORY: Source & {
  alt: string;
} = {
  src: '/images/category.jpg',
  alt: 'DEFAULT_IMAGE_CATEGORY',
};
export const PAYMENT_COOKIE = 'payment';

export type StatusOrderType =
  | 'PENDING'
  | 'PAID'
  | 'DELIVERING'
  | 'COMPLETE'
  | 'CANCELED';

export const statusOrder: Record<StatusOrderType, string> = {
  PENDING: 'Chưa thanh toán',
  PAID: 'Đã thanh toán',
  DELIVERING: 'Đang vận chuyển',
  COMPLETE: 'Thành công',
  CANCELED: 'Hủy đơn hàng',
};

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
export const paymentStatus: Record<PaymentStatus, string> = {
  PENDING: 'Đang chờ thanh toán',
  SUCCESS: 'Thanh toán thành công',
  FAILED: 'Thanh toán thất bại',
};

export type PaymentProvider = 'SEPAY' | 'VNPAY';
export const paymentProvider: Record<PaymentProvider, string> = {
  SEPAY: 'SEPAY',
  VNPAY: 'VNPAY',
};

export type BreakPointType = 'mobile' | 'pc' | 'tablet';

export const APP_INFO = {
  NAME: 'Hoa Tươi Nhật Nam',
  ZALO_OA: 'https://zalo.me/1057696361500855184',
  PHONE: '+84965809127',
  ADDRESS: '208 Đ. 11, Linh Xuân, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
  MAP: 'https://maps.app.goo.gl/2f8PatDQDXmZuscV8',
  MAP_EMBED:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.87221464334579!2d106.76815359896673!3d10.89099155221682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d96004948bfd%3A0xf9f6092a6c7a60f5!2zU2hvcCBob2EgdMawxqFpIE5o4bqtdCBOYW0!5e0!3m2!1sen!2s!4v1761979990779!5m2!1sen!2s',
};
