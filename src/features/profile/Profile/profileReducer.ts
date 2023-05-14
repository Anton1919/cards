import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAppStatus } from 'app/appReducer';
import { AxiosError } from 'axios';
import { handleServerAppError } from 'utils/error-utils';
import {profileAPI} from "features/profile/api/profileAPI";

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

export const changeMyProfile = createAsyncThunk('profile/myProfile', async (params: {name: string, avatar: string}, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await profileAPI.changeProfile(params.name, params.avatar);
    dispatch(setAppStatus({ status: 'succeeded' }));
    return res.data
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
    setProfileName: (state, action:PayloadAction<{profileName: string}>) => {
      state.name = action.payload.profileName
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(changeMyProfile.fulfilled, (state, action) => {
          state.name = action.payload.updatedUser.name
          state._id = action.payload.updatedUser._id
          state.email = action.payload.updatedUser.email
          state.avatar = action.payload.updatedUser.avatar
        })
  }
});

export const profileReducer = slice.reducer;
export const { setProfileData, setProfileName } = slice.actions;
