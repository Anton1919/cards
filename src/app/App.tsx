import React from 'react';
import Button from '../common/components/Button/Button';
import Header from '../common/components/Header/Header';
import Main from '../common/components/Main/Main';
import s from './App.module.scss';
import Login from '../features/ui/login/Login';
import { Route, Routes } from 'react-router-dom';
import Registration from '../features/ui/registration/Registration';

const App = () => {
  return (
    <div className={s.App}>
      <Header>
        <Button name={'Sign in'} />
      </Header>
      <Main>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/registration'} element={<Registration />} />
        </Routes>
      </Main>
    </div>
  );
};

export default App;
