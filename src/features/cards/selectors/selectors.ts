import {AppRootStateType} from "../../../app/store";

export const selectCards = (state: AppRootStateType) => state.cards.cards
export const selectTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectCardPage = (state: AppRootStateType) => state.cards.page
export const selectCardPageCount = (state: AppRootStateType) => state.cards.pageCount

