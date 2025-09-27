import { StatusOrderType } from '@/utils/const.util';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderState = {
  isOpenDialogUpdate: boolean;
  orderId?: number;
  currentStatus?: StatusOrderType;
};

const initialState: OrderState = {
  isOpenDialogUpdate: false,
};

const orderManagerSlice = createSlice({
  name: 'mediaSlice',
  initialState: initialState,
  reducers: {
    openDialogUpdate(
      state: OrderState,
      action: PayloadAction<{
        orderId: number;
        currentStatus: StatusOrderType;
      }>,
    ) {
      state.isOpenDialogUpdate = true;
      state.orderId = action.payload.orderId;
      state.currentStatus = action.payload.currentStatus;
    },
    closeDialogUpdate(state: OrderState) {
      state.isOpenDialogUpdate = false;
    },
  },
});

const orderManagerReducer = orderManagerSlice.reducer;
export const { closeDialogUpdate, openDialogUpdate } =
  orderManagerSlice.actions;

export default orderManagerReducer;
export type { OrderState };
