import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddPackType, packsAPI, PackType} from './api/packsAPI';
import {setAppStatus} from '../../app/appReducer';
import {AxiosError} from 'axios';
import {handleServerAppError} from '../../utils/error-utils';
import {AppRootStateType} from "../../app/store";

type InitialStateType = {
    cardPacks: PackType[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    searchParams: {
        page: number;
        pageCount: number;
        user_id: string | undefined
    }
};

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    searchParams: {
        page: 1,
        pageCount: 4,
        user_id: ""
    }
};

export const getPacks = createAsyncThunk(
    'packs/usersPacks',
    async (param: {userId: string | undefined}, {
        dispatch,
        getState,
        rejectWithValue
    }) => {
        const state = getState() as AppRootStateType
        const {page, pageCount, user_id} = state.packs.searchParams
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.getUsersPacks(page, pageCount, user_id);
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
    reducers: {
        setUserId: (state, action: PayloadAction<{ userId: string }>) => {
            state.searchParams.user_id = action.payload.userId
        },
        setPageAC: (state, action: PayloadAction<{ page: number }>) => {
            state.searchParams.page = action.payload.page
        },
        setPageCountAC: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.searchParams.pageCount = action.payload.pageCount
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPacks.fulfilled, (state, action) => {
                state.cardPacks = action.payload.cardPacks;
                state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
                state.maxCardsCount = action.payload.maxCardsCount;
                state.minCardsCount = action.payload.minCardsCount;
                state.searchParams.page = action.payload.page;
                state.searchParams.pageCount = action.payload.pageCount;
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
export const {setUserId, setPageAC, setPageCountAC} = slice.actions
