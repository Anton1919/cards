import React, { useEffect } from 'react';
import Button from '../common/components/Button/Button';
import Header from '../common/components/Header/Header';
import Main from '../common/components/Main/Main';
import s from './App.module.scss';
import RoutesPage from '../common/routes/RoutesPage';
import { useAppDispatch, useAppSelector } from './store';
import PreLoader from '../common/components/Loader/PreLoader';
import Error from '../common/components/ErrorWarning/Error';
import { me } from '../features/auth/authReducer/authReducer';

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);
  const status = useAppSelector((state) => state.app.status);
  const error = useAppSelector((state) => state.app.error);

  useEffect(() => {
    dispatch(me());
  }, []);
  if (!isInitialized || status === 'loading') {
    return <PreLoader />;
  }

  return (
    <div className={s.App}>
      <Header>
        <Button name={'Sign In'} />
      </Header>
      {error && <Error message={error as string} />}
      {/*<ErrorSnackbar />*/}
      <Main>
        <RoutesPage />
      </Main>
    </div>
  );
};

export default App;
