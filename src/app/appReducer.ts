import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: RequestStatusType;
  error: null | string;
  error404: null | string
};

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  error404: null
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setError404: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error404 = action.payload.error;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setAppError, setError404 } = slice.actions;
