import React, { useEffect } from 'react';
import s from './Error.module.scss';
import { setAppError } from '../../../app/appReducer';
import { useAppDispatch } from '../../../app/store';

type ErrorType = {
  message: string;
};

const Error = ({ message }: ErrorType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setAppError({ error: null }));
    }, 2500);
  }, []);

  return <div className={s.error}>{message}</div>;
};

export default Error;
