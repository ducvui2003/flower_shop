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

export const ALT = 'An Nhien';
export const TITLE = 'An Nhien';
export const DESCRIPTION =
  'An Nhien - Cửa hàng nước hoa chính hãng, chất lượng cao, giá cả hợp lý. Đặt hàng ngay hôm nay để trải nghiệm hương thơm tuyệt vời!';
export const DEFAULT_IMAGE = '/images/product.png';
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
