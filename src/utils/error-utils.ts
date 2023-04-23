import { Dispatch } from 'redux';
import { setAppError, setAppStatus } from '../app/appReducer';
import axios, { AxiosError } from 'axios';

export const handleServerAppError = (error: AxiosError, dispatch: Dispatch) => {
  if (axios.isAxiosError(error)) {
    const err = error.response?.data ? error.response.data.error : 'Some error please try again later';
    dispatch(setAppError({ error: err }));
  } else {
    dispatch(setAppError({ error: 'Some error please try again later' }));
  }
  dispatch(setAppStatus({ status: 'failed' }));
};
