import { AppRootStateType } from '../../app/store';

export const selectStatus = (state: AppRootStateType) => state.app.status;
export const selectError = (state: AppRootStateType) => state.app.error;
export const selectForgotStatus = (state: AppRootStateType) => state.forgot.forgotStatus;
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectIsInitialized = (state: AppRootStateType) => state.auth.isInitialized;
export const selectSignUp = (state: AppRootStateType) => state.auth.signUp;
export const selectAvatar = (state: AppRootStateType) => state.profile.avatar;
export const selectEmail = (state: AppRootStateType) => state.profile.email;
export const selectName = (state: AppRootStateType) => state.profile.name;
export const selectUser = (state: AppRootStateType) => state.profile;
export const selectUserId = (state: AppRootStateType) => state.profile._id
