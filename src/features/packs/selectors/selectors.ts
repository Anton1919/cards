import { AppRootStateType } from '../../../app/store';

export const selectPacks = (state: AppRootStateType) => state.packs.cardPacks;
export const selectTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount;
export const selectPage = (state: AppRootStateType) => state.packs.page;
export const selectPageCount = (state: AppRootStateType) => state.packs.pageCount;
export const selectIdForPackCrud = (state: AppRootStateType) => state.profile._id;
