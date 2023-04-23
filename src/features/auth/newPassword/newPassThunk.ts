import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../api/authAPI';

export const newPasswordThunk = createAsyncThunk(
  'auth/newPasswordThunk',
  async (param: { password: string; passwordToken: string }, thunkAPI) => {
    try {
      const res = await authAPI.newPassword(param.password, param.passwordToken);
    } catch (e: any) {
      thunkAPI.rejectWithValue({ someError: 'SomeError' });
    } finally {
      console.log('finally');
    }
  }
);
