import {AppRootStateType} from 'app/store';

export const selectPacks = (state: AppRootStateType) => state.packs.cardPacks;
export const selectTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount;
export const selectPage = (state: AppRootStateType) => state.packs.searchParams.page;
export const selectPageCount = (state: AppRootStateType) => state.packs.searchParams.pageCount;
export const selectIdForPackCrud = (state: AppRootStateType) => state.profile._id;
export const selectProfileId = (state: AppRootStateType) => state.profile._id;
export const selectUserId = (state: AppRootStateType) => state.packs.searchParams.user_id;
export const selectMin = (state: AppRootStateType) => state.packs.searchParams.min
export const selectMax = (state: AppRootStateType) => state.packs.searchParams.max
export const selectMaxCardsCount = (state: AppRootStateType) => state.packs.maxCardsCount
export const selectMinCardsCount = (state: AppRootStateType) => state.packs.minCardsCount
export const selectorSortPack = (state: AppRootStateType) => state.packs.searchParams.sortPacks
export const selectorPackNameSearch = (state: AppRootStateType) => state.packs.searchParams.packName
export const selectIsMy = (state: AppRootStateType) => state.packs.searchParams.isMy
