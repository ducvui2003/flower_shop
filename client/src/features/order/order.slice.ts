import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderState = {
  isOpenDetailSheet: boolean;
  orderId?: number;
  qrCode?: string;
};

const initialState: OrderState = {
  isOpenDetailSheet: false,
};

const orderSlice = createSlice({
  name: 'mediaSlice',
  initialState: initialState,
  reducers: {
    setIsDetailSheet(state: OrderState, action: PayloadAction<boolean>) {
      state.isOpenDetailSheet = action.payload;
    },
    setOrderId(state: OrderState, action: PayloadAction<number>) {
      state.orderId = action.payload;
    },
  },
});

const orderReducer = orderSlice.reducer;
export const { setIsDetailSheet, setOrderId } = orderSlice.actions;

export default orderReducer;
export type { OrderState };
