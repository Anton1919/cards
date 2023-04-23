import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../api/authAPI';

const initialState = {
  forgotPassword: false,
};

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
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotPassword = true;
    }),
});

export const forgotReducer = slice.reducer;
