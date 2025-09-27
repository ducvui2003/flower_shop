export type ProvinceType = {
  id: number;
  name: string;
};

export type DistrictType = {
  id: number;
  name: string;
  parentId: string;
};

export type WardType = DistrictType;
