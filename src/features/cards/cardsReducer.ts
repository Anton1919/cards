import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardParamsType, cardsAPI, CardsType} from "./api/cardsAPI";
import {AxiosError} from "axios";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatus} from "../../app/appReducer";
import {AppRootStateType} from "../../app/store";

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

export const getCardsTC = createAsyncThunk('cards/usersCards', async (params: {cardsId: string | undefined}, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    const state = getState() as AppRootStateType
    const {page, pageCount, question} = state.cards
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await cardsAPI.getCards({page, pageCount, question, cardsId: params.cardsId})
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
    reducers: {
        setCardQuestion: (state, action: PayloadAction<{ payloadProperty: string }>) => {
            state.question = action.payload.payloadProperty
        },
        setCardPage: (state, action: PayloadAction<{cardPage: number}>) => {
            state.page = action.payload.cardPage
        },
        setCardPageCount: (state, action: PayloadAction<{pageCount: number}>) => {
            state.pageCount = action.payload.pageCount
        },
    },
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
export const {setCardQuestion, setCardPage, setCardPageCount} = slice.actions