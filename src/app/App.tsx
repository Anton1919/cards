import React, { useEffect } from 'react';
import Button from '../common/components/Button/Button';
import Header from '../common/components/Header/Header';
import Main from '../common/components/Main/Main';
import s from './App.module.scss';
import RoutesPage from '../common/routes/RoutesPage';
import { me } from '../features/auth/authReducer/authReducer';
import { useAppDispatch } from './store';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
  });

  return (
    <div className={s.App}>
      <Header>
        <Button name={'Sign In'} />
      </Header>
      <Main>
        <RoutesPage />
      </Main>
    </div>
  );
};

export default App;
