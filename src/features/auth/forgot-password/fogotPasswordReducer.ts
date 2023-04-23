import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../api/authAPI';
import { AxiosError } from 'axios';
import { handleServerAppError } from '../../../utils/error-utils';
import { setAppStatus } from '../../../app/appReducer';

const initialState = {
  forgotStatus: false,
};

export const newPassword = createAsyncThunk(
  'auth/newPasswordThunk',
  async (param: { password: string; resetPasswordToken: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      await authAPI.newPassword(param.password, param.resetPasswordToken);
      dispatch(setAppStatus({ status: 'succeeded' }));
    } catch (e) {
      const error = e as AxiosError;
      handleServerAppError(error, dispatch);
      rejectWithValue({ someError: 'SomeError' });
    }
  }
);

export const forgotPassword = createAsyncThunk('auth/forgot', async (param: string, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    await authAPI.forgotPassword(param);
    dispatch(setAppStatus({ status: 'succeeded' }));
  } catch (e) {
    const error = e as AxiosError;
    handleServerAppError(error, dispatch);
    return rejectWithValue({ someError: 'SomeError' });
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
