import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI, LoginType } from '../api/authAPI';

export type InitialStateType = typeof initialState;

const initialState = {
  status: 'idle',
  isLoggedIn: false,
  signUp: false,
};

export const signUp = createAsyncThunk('auth/signUp', async (param: { email: string; password: string }, thunkAPI) => {
  try {
    const res = await authAPI.registration(param);
    console.log(res.data);
  } catch (e: any) {
    return thunkAPI.rejectWithValue({ someError: 'SomeError' });
  }
});

export const logIn = createAsyncThunk('auth/logIn', async (param: LoginType, thunkAPI) => {
  try {
    const res = await authAPI.login(param);
    console.log(res.data);
  } catch (e: any) {
    return thunkAPI.rejectWithValue({ someError: 'SomeError' });
  } finally {
    console.log('finally');
  }
});

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
  try {
    const res = await authAPI.logout();
    console.log(res.data);
    return;
  } catch (e: any) {
    return thunkAPI.rejectWithValue({ someError: 'SomeError' });
  } finally {
    console.log('finally');
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
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
export const { setIsLoggedIn } = slice.actions;
