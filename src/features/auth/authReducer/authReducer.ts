import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../api/authAPI';

export type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};

export const me = createAsyncThunk('auth/me', async (param, thunkAPI) => {
  try {
    const res = await authAPI.me();
    console.log(res.data);
    thunkAPI.dispatch(setIsLoggedIn({ isLoggedIn: true }));
    thunkAPI.dispatch(setIsInitialized({ isInitialized: true }));
  } catch (e: any) {
    console.log(e);
  } finally {
    console.log('finally');
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
      state.isLoggedIn = action.payload.isInitialized;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedIn, setIsInitialized } = slice.actions;
