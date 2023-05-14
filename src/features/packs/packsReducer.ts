import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddPackType, packsAPI, PackType, UpdatePackType} from './api/packsAPI';
import {setAppStatus} from 'app/appReducer';
import {AxiosError} from 'axios';
import {handleServerAppError} from 'utils/error-utils';
import {AppRootStateType} from "app/store";

type InitialStateType = {
    cardPacks: PackType[];
    cardPacksTotalCount: number;
    maxCardsCount: number
    minCardsCount: number
    searchParams: {
        sortPacks: string,
        packName: string
        min: number,
        max: number,
        page: number;
        pageCount: number;
        user_id: string | undefined
        isMy?: boolean
    }
};

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    searchParams: {
        sortPacks: '0updated',
        packName: '',
        min: 0,
        max: 0,
        page: 1,
        pageCount: 4,
        user_id: "",
        isMy: false
    }
};

export const getPacks = createAsyncThunk(
    'packs/usersPacks',
    async (param: { userId: string | undefined }, {
        dispatch,
        getState,
        rejectWithValue
    }) => {
        const state = getState() as AppRootStateType
        const {page, pageCount, user_id, min, max, sortPacks, packName} = state.packs.searchParams
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.getUsersPacks(page, pageCount, min, max, sortPacks, packName, user_id);
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
    async (param: AddPackType, {dispatch, getState, rejectWithValue}) => {
        const state = getState() as AppRootStateType
        const {packUserId} = state.cards
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.addPack(param);
            dispatch(getPacks({userId: packUserId}))
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
    async (packId: string, {dispatch, getState, rejectWithValue}) => {
        const state = getState() as AppRootStateType
        const {packUserId} = state.cards
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.deletePack(packId);
            dispatch(getPacks({userId: packUserId}))
            return res.data;
        } catch (e) {
            const error = e as AxiosError;
            handleServerAppError(error, dispatch);
            dispatch(setAppStatus({status: 'succeeded'}));
            return rejectWithValue({});
        }
    }
);

export const updatePack = createAsyncThunk(
    'packs/updatePack',
    async (param: UpdatePackType, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}));
        try {
            const res = await packsAPI.editPack(param);
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
        },
        setMin: (state, action: PayloadAction<{ min: number }>) => {
            state.searchParams.min = action.payload.min
        },
        setMax: (state, action: PayloadAction<{ max: number }>) => {
            state.searchParams.max = action.payload.max
        },
        setSortPacks: (state, action: PayloadAction<{ sortPacks: string }>) => {
            state.searchParams.sortPacks = action.payload.sortPacks
        },
        setPackName: (state, action: PayloadAction<{ payloadProperty: string }>) => {
            state.searchParams.packName = action.payload.payloadProperty
        },
        setIsMy: (state, action: PayloadAction<{ value: boolean }>) => {
            state.searchParams.isMy = action.payload.value
        },
        setFilterPacks: (state, action: PayloadAction<{isMy: boolean, min: number, max: number, userId: string}>) => {
            state.searchParams.isMy = action.payload.isMy
            state.searchParams.user_id = action.payload.userId
            state.searchParams.min = action.payload.min
            state.searchParams.max = action.payload.max
        },

        resetAllSettings: (state, action: PayloadAction<{ max: number }>) => {
            state.searchParams.max = action.payload.max
            state.searchParams.packName = ""
            state.searchParams.user_id = ""
            state.searchParams.min = 0
            state.searchParams.page = 1
            state.searchParams.pageCount = 4
            state.searchParams.isMy = false
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
    },
});

export const packsReducer = slice.reducer;
export const {
   setFilterPacks,
    setUserId,
    setPageAC,
    setPageCountAC,
    setMin,
    setMax,
    setSortPacks,
    setPackName,
    resetAllSettings,
    setIsMy,
} = slice.actions
