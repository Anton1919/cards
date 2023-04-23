import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../api/authAPI';

export const newPasswordThunk = createAsyncThunk(
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
