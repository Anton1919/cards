import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAppStatus } from 'app/appReducer';
import { AxiosError } from 'axios';
import { handleServerAppError } from 'utils/error-utils';
import {setProfileData} from "features/profile/Profile/profileReducer";
import {authAPI, LoginType} from "features/auth/api/authAPI";

export type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  signUp: false,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (param: { email: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      await authAPI.registration(param);
    } catch (e) {
      const error = e as AxiosError;
      handleServerAppError(error, dispatch);
      return rejectWithValue({ someError: 'SomeError' });
    }
  }
);

export const logIn = createAsyncThunk('auth/logIn', async (param: LoginType, { rejectWithValue, dispatch }) => {
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await authAPI.login(param);
    dispatch(
      setProfileData({ email: res.data.email, avatar: res.data.avatar, name: res.data.name, _id: res.data._id })
    );
    dispatch(setAppStatus({ status: 'succeeded' }));
  } catch (e) {
    const error = e as AxiosError;
    handleServerAppError(error, dispatch);
    return rejectWithValue({ someError: 'SomeError' });
  }
});

export const logout = createAsyncThunk('auth/logout', async (param, { rejectWithValue, dispatch }) => {
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    await authAPI.logout();
    dispatch(setAppStatus({ status: 'succeeded' }));
  } catch (e) {
    const error = e as AxiosError;
    handleServerAppError(error, dispatch);
    return rejectWithValue({ someError: 'SomeError' });
  }
});

export const me = createAsyncThunk('auth/me', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await authAPI.me();
    dispatch(setIsLoggedIn({ isLoggedIn: true }));
    dispatch(setIsInitialized({ isInitialized: true }));
    dispatch(
      setProfileData({ email: res.data.email, avatar: res.data.avatar, name: res.data.name, _id: res.data._id })
    );
    dispatch(setAppStatus({ status: 'succeeded' }));
  } catch (e) {
    dispatch(setIsInitialized({ isInitialized: true }));
    dispatch(setAppStatus({ status: 'succeeded' }));
    return rejectWithValue({});
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUp = true;
      });
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedIn, setIsInitialized } = slice.actions;
