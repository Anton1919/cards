import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../api/authAPI';

const initialState = {
  forgotStatus: false,
};

export const newPassword = createAsyncThunk(
  'auth/newPasswordThunk',
  async (param: { password: string; resetPasswordToken: string }, thunkAPI) => {
    try {
      const res = await authAPI.newPassword(param.password, param.resetPasswordToken);
    } catch (e: any) {
      thunkAPI.rejectWithValue({ someError: 'SomeError' });
    } finally {
      console.log('finally');
    }
  }
);

export const forgotPassword = createAsyncThunk('auth/forgot', async (param: string, thunkAPI) => {
  try {
    const res = await authAPI.forgotPassword(param);
    console.log(res.data);
  } catch (e: any) {
    return thunkAPI.rejectWithValue({ someError: 'SomeError' });
  } finally {
    console.log('finally');
  }
});

const slice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotStatus = true;
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        state.forgotStatus = true;
      }),
});

export const forgotReducer = slice.reducer;
