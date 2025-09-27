import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AddressType = {
  id: number;
  name: string;
};

type AddressState = {
  province?: AddressType;
  district?: AddressType;
  ward?: AddressType;
  detail?: string;
  feeShipping?: number;
};

const initialState: AddressState = {};

const addressSlice = createSlice({
  name: 'addressSlice',
  initialState: initialState,
  reducers: {
    setProvince(state: AddressState, action: PayloadAction<AddressType>) {
      state.province = action.payload;
    },
    setDistrict(state: AddressState, action: PayloadAction<AddressType>) {
      state.district = action.payload;
    },
    setWard(state: AddressState, action: PayloadAction<AddressType>) {
      state.ward = action.payload;
    },
    setDetail(state: AddressState, action: PayloadAction<string>) {
      state.detail = action.payload;
    },
  },
});
const addressReducer = addressSlice.reducer;
export const { setProvince, setDistrict, setWard, setDetail } =
  addressSlice.actions;

export default addressReducer;
export type { AddressState, AddressType };
