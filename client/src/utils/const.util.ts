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
export const DEFAULT_IMAGE = '/images/product.jpg';
export const DEFAULT_CATEGORY = '/images/category.jpg';
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
  PHONE: 'tel:+84965809127',
  ADDRESS: '208 Đ. 11, Linh Xuân, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
  MAP: 'https://maps.app.goo.gl/2f8PatDQDXmZuscV8',
};
