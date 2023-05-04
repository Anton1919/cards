import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CardParamsType, cardsAPI, CardsType} from "./api/cardsAPI";
import {AxiosError} from "axios";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatus} from "../../app/appReducer";

type InitialStateType = {
    cards: CardsType[]
    cardsTotalCount: number
    page: number
    pageCount: number
    packUserId: string
    packName: string
    question: string
}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    packName: '',
    question: ''
}

export const getCardsTC = createAsyncThunk('cards/usersCards', async (params: CardParamsType, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await cardsAPI.getCards({page: params.page, pageCount: params.pageCount, cardsId: params.cardsId})
        dispatch(setAppStatus({status: 'succeeded'}));
        return res.data
    } catch (e) {
        const error = e as AxiosError;
        handleServerAppError(error, dispatch);
        dispatch(setAppStatus({status: 'succeeded'}));
        return rejectWithValue({});
    }
})

const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCardsTC.fulfilled, (state, action) => {
                state.cards = action.payload.cards
                state.cardsTotalCount = action.payload.cardsTotalCount
                state.packName = action.payload.packName
                state.packUserId = action.payload.packUserId
                state.page = action.payload.page
                state.pageCount = action.payload.pageCount
            })
    }
})

export const cardsReducer = slice.reducer