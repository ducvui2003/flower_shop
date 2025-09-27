import { Role } from '@/types/auth.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthStatus = 'authenticated' | 'un-authenticated' | 'loading';

type AuthState = {
  status: AuthStatus;
  accessToken: string | null;
  user: {
    id: number;
    email: string;
    name: string;
    avatar?: string;
    role: Role;
  } | null;
  expiresAt: number | null;
};

const initialState: AuthState = {
  status: 'un-authenticated',
  accessToken: null,
  user: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: 'mediaSlice',
  initialState: initialState,
  reducers: {
    setStatus(state: AuthState, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
    setAuthState(state: AuthState, action: PayloadAction<AuthState>) {
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expiresAt;
      state.status = action.payload.status;
      state.user = action.payload.user;
    },
  },
});

const authReducer = authSlice.reducer;
export const { setAuthState, setStatus } = authSlice.actions;

export default authReducer;
export type { AuthState };
