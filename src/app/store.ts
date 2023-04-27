import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from '../features/auth/authReducer/authReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './appReducer';
import { forgotReducer } from '../features/auth/forgot-password/fogotPasswordReducer';
import { profileReducer } from '../features/profile/Profile/profileReducer';
import { packsReducer } from '../features/packs/packsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  forgot: forgotReducer,
  profile: profileReducer,
  packs: packsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
