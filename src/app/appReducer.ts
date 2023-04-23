import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../features/auth/api/authAPI';
import { setIsLoggedIn } from '../features/auth/authReducer/authReducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'idle' as RequestStatusType,
  isInitialized: false,
};

export const initializeApp = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
  try {
    const res = await authAPI.me();
    console.log(res.data);
    thunkAPI.dispatch(setIsLoggedIn({ isLoggedIn: true }));
  } catch (err) {
    // const error: AxiosError = err
    console.log(err);
    return thunkAPI.rejectWithValue({ someError: 'SomeError' });
  } finally {
    console.log('finally');
  }
});

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeApp.fulfilled, (state, action) => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;
