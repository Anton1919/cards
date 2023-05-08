import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PATHS } from './PATHS';
import SignIn from 'features/auth/login/SignIn';
import SignUp from 'features/auth/registration/SignUp';
import ForgotPassword from 'features/auth/forgot-password/ForgotPassword';
import CheckEmail from 'features/auth/forgot-password/CheckEmail/CheckEmail';
import NewPassword from 'features/auth/newPassword/NewPassword';
import Profile from 'features/profile/Profile/Profile';
import Packs from 'features/packs/Packs';
import Cards from "features/cards/Cards";

const RoutesPage = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={'/login'} />} />
      <Route path={PATHS.login} element={<SignIn />} />
      <Route path={PATHS.register} element={<SignUp />} />
      <Route path={PATHS.recovery} element={<ForgotPassword />} />
      <Route path={PATHS.checkEmail} element={<CheckEmail />} />
      <Route path={PATHS.newPassword} element={<NewPassword />} />
      <Route path={PATHS.profile} element={<Profile />} />
      <Route path={PATHS.packsList} element={<Packs />} />
      <Route path={PATHS.pack} element={<Cards />} />
      {/*<Route path={PATHS.notFound} element={<Error404 />} />*/}
      {/*<Route path={PATHS.unknown} element={<Navigate to="/404" />} />*/}
    </Routes>
  );
};

export default RoutesPage;
