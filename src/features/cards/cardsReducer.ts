import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddCardType, cardsAPI, CardsType, UpdateCardGrade} from "./api/cardsAPI";
import {AxiosError} from "axios";
import {handleServerAppError} from "utils/error-utils";
import {setAppStatus} from "app/appReducer";
import {AppRootStateType} from "app/store";
import {updatePack} from "features/packs/packsReducer";

type InitialStateType = {
    cards: CardsType[]
    cardsTotalCount: number
    page: number
    pageCount: number
    packUserId: string
    packName: string
    question: string
    shots: number
}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    page: 1,
    pageCount: 4,
    packUserId: '',
    packName: '',
    question: '',
    shots: 0
}

export const getCardsTC = createAsyncThunk('cards/usersCards', async (params: { cardsId: string | undefined }, {
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

export const addCard = createAsyncThunk('cards/addCard', async (params: AddCardType, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await cardsAPI.addCard({
            card: {
                cardsPack_id: params.card.cardsPack_id,
                question: params.card.question,
                answer: params.card.answer
            }
        })
        dispatch(getCardsTC({cardsId: params.card.cardsPack_id}))
        return res.data
    } catch (e) {
        const error = e as AxiosError;
        handleServerAppError(error, dispatch);
        dispatch(setAppStatus({status: 'succeeded'}));
        return rejectWithValue({});
    }
})

export const deleteCard = createAsyncThunk('cards/deleteCard', async (cardId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await cardsAPI.deleteCard(cardId)
        dispatch(getCardsTC({cardsId: res.data.deletedCard.cardsPack_id}))
        return res.data
    } catch (e) {
        const error = e as AxiosError;
        handleServerAppError(error, dispatch);
        dispatch(setAppStatus({status: 'succeeded'}));
        return rejectWithValue({});
    }
})
export const updateCard = createAsyncThunk('cards/updateCard', async (params: { cardId: string, question: string, answer: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await cardsAPI.updateCard({
            card: {
                _id: params.cardId,
                question: params.question,
                answer: params.answer
            }
        })
        dispatch(setAppStatus({status: 'succeeded'}));
        return res.data
    } catch (e) {
        const error = e as AxiosError;
        handleServerAppError(error, dispatch);
        dispatch(setAppStatus({status: 'succeeded'}));
        return rejectWithValue({});
    }
})

export const updateGrade = createAsyncThunk('cards/updateGrade', async (params: UpdateCardGrade, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await cardsAPI.updateCardGrade({grade: params.grade, card_id: params.card_id})
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
        setCardPage: (state, action: PayloadAction<{ cardPage: number }>) => {
            state.page = action.payload.cardPage
        },
        setCardPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
            state.pageCount = action.payload.pageCount
        }
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
            .addCase(updatePack.fulfilled, (state, action) => {
                state.packName = action.payload.updatedCardsPack.name
            })
            .addCase(addCard.fulfilled, (state, action) => {
                state.cards.unshift(action.payload.newCard)
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                const index = state.cards.findIndex(el => el._id === action.payload.deletedCard.cardsPack_id)
                state.cards.splice(index, 1)
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                const index = state.cards.findIndex(el => el._id === action.payload.updatedCard._id)
                state.cards[index] = {...state.cards[index], ...action.payload.updatedCard}
            })
            .addCase(updateGrade.fulfilled, (state, action) => {
                const index = state.cards.findIndex(el => el._id === action.payload.updatedGrade._id)
                state.cards[index] = {...state.cards[index], ...action.payload.updatedGrade}
                state.shots = action.payload.updatedGrade.shots
            })

    }
})

export const cardsReducer = slice.reducer
export const {setCardQuestion, setCardPage, setCardPageCount} = slice.actions