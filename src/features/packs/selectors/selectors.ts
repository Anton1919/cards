import { AppRootStateType } from '../../../app/store';

export const selectPacks = (state: AppRootStateType) => state.packs.cardPacks;
