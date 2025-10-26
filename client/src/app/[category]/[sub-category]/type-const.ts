type SearchParamsKeyType = 'price' | 'category' | 'sort';
type SearchParamsValueType = 'muc-gia' | 'danh-muc' | 'sap-xep';
type PageParamsKeyType = 'page';
type PageParamsValueType = 'trang';
const SEARCH_MAPPING: Record<SearchParamsKeyType, SearchParamsValueType> = {
  price: 'muc-gia',
  category: 'danh-muc',
  sort: 'sap-xep',
};

const PAGE_MAPPING: Record<PageParamsKeyType, PageParamsValueType> = {
  page: 'trang',
};

const SORT_MAPPING = {
  asc: 'gia-tang-dan',
  desc: 'gia-giam-dan',
};
export { SEARCH_MAPPING, SORT_MAPPING, PAGE_MAPPING };
export type {
  SearchParamsKeyType,
  SearchParamsValueType,
  PageParamsKeyType,
  PageParamsValueType,
};
