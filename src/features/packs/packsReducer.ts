import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AddPackType, packsAPI, PackType} from './api/packsAPI';
import {setAppStatus} from '../../app/appReducer';
import {AxiosError} from 'axios';
import {handleServerAppError} from '../../utils/error-utils';

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

export const getPacks = createAsyncThunk(
    'packs/usersPacks',
    async (param: { page: number; pageCount: number }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.getUsersPacks(param.page, param.pageCount);
            dispatch(setAppStatus({status: 'succeeded'}));
            return res.data;
        } catch (e) {
            const error = e as AxiosError;
            handleServerAppError(error, dispatch);
            dispatch(setAppStatus({status: 'succeeded'}));
            return rejectWithValue({});
        }
    }
);

export const addPackTC = createAsyncThunk(
    'packs/addPack',
    async (param: AddPackType, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.addPack(param);
            dispatch(setAppStatus({status: 'succeeded'}));
            return res;
        } catch (e) {
            const error = e as AxiosError;
            handleServerAppError(error, dispatch);
            dispatch(setAppStatus({status: 'succeeded'}));
            return rejectWithValue({});
        }
    }
);

export const deletePack = createAsyncThunk(
    'packs/deletePack',
    async (packId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.deletePack(packId);
            dispatch(setAppStatus({status: 'succeeded'}));
            return res.data;
        } catch (e) {
            const error = e as AxiosError;
            handleServerAppError(error, dispatch);
            dispatch(setAppStatus({status: 'succeeded'}));
            return rejectWithValue({});
        }
    }
);

const slice = createSlice({
    name: 'packs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPacks.fulfilled, (state, action) => {
                state.cardPacks = action.payload.cardPacks;
                state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
                state.maxCardsCount = action.payload.maxCardsCount;
                state.minCardsCount = action.payload.minCardsCount;
                state.page = action.payload.page;
                state.pageCount = action.payload.pageCount;
            })
            .addCase(addPackTC.fulfilled, (state, action) => {
                state.cardPacks.unshift({...action.payload.newCardsPack});
            })
            .addCase(deletePack.fulfilled, (state, action) => {
                const index = state.cardPacks.findIndex((el) => el._id === action.payload.deletedCardsPack._id);
                state.cardPacks.splice(index, 1);
            });
    },
});

export const packsReducer = slice.reducer;
