import React, { ReactNode } from 'react';
import s from './Main.module.scss';

type MainPropsType = {
  children: ReactNode;
};

const Main = ({ children }: MainPropsType) => {
  return <main className={s.main}>{children}</main>;
};

export default Main;
