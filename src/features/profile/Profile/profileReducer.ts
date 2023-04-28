import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAppStatus } from '../../../app/appReducer';
import { AxiosError } from 'axios';
import { handleServerAppError } from '../../../utils/error-utils';

type InitialStateType = {
  email: string | undefined;
  name: string | undefined;
  avatar?: string | undefined | null;
  _id: string;
};

const initialState: InitialStateType = {
  email: '',
  name: '',
  avatar: '',
  _id: '',
};

export const changeMyProfile = createAsyncThunk('profile/myProfile', async (param, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    // const res = await profileAPI.changeProfile();
    dispatch(setAppStatus({ status: 'succeeded' }));
  } catch (e) {
    const error = e as AxiosError;
    handleServerAppError(error, dispatch);
    return rejectWithValue({ someError: 'SomeError' });
  }
});

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<InitialStateType>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state._id = action.payload._id;
    },
  },
});

export const profileReducer = slice.reducer;
export const { setProfileData } = slice.actions;
