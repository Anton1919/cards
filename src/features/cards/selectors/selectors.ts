import {AppRootStateType} from "app/store";

export const selectCards = (state: AppRootStateType) => state.cards.cards
export const selectTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectCardPage = (state: AppRootStateType) => state.cards.page
export const selectCardPageCount = (state: AppRootStateType) => state.cards.pageCount
export const selectProfileID = (state: AppRootStateType) => state.profile._id
export const selectUserID = (state: AppRootStateType) => state.cards.packUserId
export const selectPackName = (state: AppRootStateType) => state.cards.packName
export const selectCardQuestion = (state: AppRootStateType) => state.cards.question
export const selectCardShots = (state: AppRootStateType) => state.cards.shots
export const selectDeckCover = (state: AppRootStateType) => state.cards.packDeckCover

