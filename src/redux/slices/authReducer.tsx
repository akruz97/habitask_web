import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthUserData, LoginResponse } from './../../interfaces'
import { loginAction, logoutAction, registerAction } from '../actions/authActions';

export interface AuthState {
  status:
    | 'checking'
    | 'authenticated'
    | 'not-authenticated'
    | 'loading'
  token: string | null;
  errorMessage: string | null;
  successMessage: string | null;
  errorCode: number | null;
  userData: AuthUserData | null;
  loading: boolean;
  errorRegister: string | null,
  successRegister: string | null
  loadingRegister: boolean;
}

const initialState: AuthState = {
  status: 'not-authenticated',
  token: null,
  userData: null,
  errorMessage: '',
  successMessage: '',
  errorCode: null,
  loading: false,
  errorRegister: null,
  successRegister: null,
  loadingRegister: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checking(state){
      state.status = 'loading';
    },
    loadingLogout(state){
        state.loading = true;
    },
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token;
      state.status = 'authenticated';
      state.loading = false;
    },
    restoreToken: (state) => {
      state.token = null;
      state.status = 'not-authenticated';
      state.loading = false;
      state.errorMessage = null
    },
    logout: (state) => {
      state.token = null;
      state.status = 'not-authenticated';
      state.loading = false;
      state.errorRegister = null
      state.successRegister = null
      state.loadingRegister = false
    },
    clearMessage: (state) => {
      state.errorMessage = ''
    },
    resetFlagsRegister: (state) => {
      state.errorRegister = null
      state.successRegister = null
      state.loadingRegister = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.status = 'checking';
      state.loading = true;
    }),
    builder.addCase(loginAction.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.status = 'authenticated';
      state.loading = false;
    }),
    builder.addCase(loginAction.rejected, (state: AuthState, action: PayloadAction<any>) => {
      state.token = null;
      state.loading = false;
      state.status = 'not-authenticated';
      state.errorMessage = action.payload.errorMessage;
    }),


    builder.addCase(registerAction.pending, (state, action) => {
      state.loadingRegister = true;
    }),
    builder.addCase(registerAction.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
      state.loadingRegister = false;
      state.successRegister = action.payload.message
      state.errorRegister = null
    }),
    builder.addCase(registerAction.rejected, (state: AuthState, action: PayloadAction<any>) => {
      state.loadingRegister = false;
      state.errorMessage = action.payload.errorMessage;
      state.successRegister = null
    })
  }
})

export const { 
  checking,
  login,
  restoreToken,
  logout,
  loadingLogout,
  clearMessage,
  resetFlagsRegister
} = authSlice.actions

export default authSlice.reducer