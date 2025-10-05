type SearchParamsKeyType = 'price' | 'category' | 'sort';
type SearchParamsValueType = 'muc-gia' | 'danh-muc' | 'sap-xep';
const SEARCH_MAPPING: Record<SearchParamsKeyType, SearchParamsValueType> = {
  price: 'muc-gia',
  category: 'danh-muc',
  sort: 'sap-xep',
};

const SORT_MAPPING = {
  asc: 'gia-tang-dan',
  desc: 'gia-giam-dan',
};
export { SEARCH_MAPPING, SORT_MAPPING };
export type { SearchParamsKeyType, SearchParamsValueType };
