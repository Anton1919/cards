import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { packsAPI, PackType } from './api/packsAPI';
import { setAppStatus } from '../../app/appReducer';

type InitialStateType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

const initialState: InitialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 4,
};

export const getCards = createAsyncThunk(
  'packs/usersCards',
  async (param: { page: number; pageCount: number }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      const res = await packsAPI.getUsersPacks(param.page, param.pageCount);
      dispatch(setAppStatus({ status: 'succeeded' }));
      return res.data;
    } catch (e: any) {
      dispatch(setAppStatus({ status: 'succeeded' }));
      return rejectWithValue({});
    }
  }
);

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardPacks = action.payload.cardPacks;
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
      state.maxCardsCount = action.payload.maxCardsCount;
      state.minCardsCount = action.payload.minCardsCount;
      state.page = action.payload.page;
      state.pageCount = action.payload.pageCount;
    });
  },
});

export const packsReducer = slice.reducer;
