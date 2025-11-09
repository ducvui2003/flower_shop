import authReducer from '@/features/auth/auth.slice';

import { mediaApi } from '@/features/media/media.api';
import mediaReducer from '@/features/media/media.slice';
import { productApi } from '@/features/product/product.api';
import { reviewApi } from '@/features/review/review.api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      authSlice: authReducer,
      mediaSlice: mediaReducer,
      [mediaApi.reducerPath]: mediaApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [reviewApi.reducerPath]: reviewApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(mediaApi.middleware)
        .concat(productApi.middleware)
        .concat(reviewApi.middleware);
    },
  });

  setupListeners(store.dispatch);

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
