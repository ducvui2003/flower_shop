import { APP_INFO } from '@/utils/const.util';

const TEXT = {
  HEADER: {
    TOP: 'SDT: 0965809127',
  },
  FOOTER: [
    {
      title: APP_INFO.NAME,
      li: [APP_INFO.ADDRESS, `SĐT: ${APP_INFO.PHONE}`],
    },
    {
      title: 'Chính sách',
      li: [
        'Giới thiệu annhien.vn',
        'Điều khoản dịch vụ',
        'Chính sách vận chuyển',
      ],
    },
  ],
  HOTLINE: 'Hotline đặt hàng nhanh 0965809127',
  SHOP: {
    NAME: 'Hoa tuoi Nhat Nam',
    PHONE: '0965809127',
  },
  PRODUCT: {
    CARD: {
      SALE: 'Giảm giá',
      BUY: 'Mua ngay',
      SEE: 'Xem chi tiết',
    },
  },
  PRODUCT_LIST: {
    MORE: 'Xem thêm',
    EMPTY:
      'Rất tiếc, chúng tôi không có sản phẩm nào phù hợp với bộ lọc của bạn',
    FILTER: {
      FILTER: 'Bộ lọc',
      CATEGORY: 'Thể loại hoa',
      PRICE: 'Mức giá',
      PRICE_TEMPLATE: 'Từ {{from}} - {{to}}',
      PRICE_MANUAL: 'Hoặc nhập khoảng giá phù hợp với bạn:',
    },
    SORT: {
      QUANTITY: 'Tìm thấy {{quantity}} kết quả',
      DESC: 'Giá giảm dần',
      ASC: 'Giá tăng dần',
    },
  },
  PRODUCT_DETAIL: {
    DESCRIPTION: 'Mô tả sản phẩm',
    REVIEW: 'Đánh giá sản phẩm',
    VAT: 'Giá đã bao gồm 8% VAT',
    ORDER: 'Đặt nhanh',
    ZALO_OA: 'Zalo OA',
    CATEGORY: 'Danh mục:',
    ORDER_ADDRESS: 'Đặt hàng tại',
    MAP: 'Bản đồ',
    PHONE: 'SĐT',
  },
};

export default TEXT;
