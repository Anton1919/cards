import React, { ReactNode } from 'react';
import s from './Card.module.scss';

type CardPropsType = {
  title?: string;
  children: ReactNode;
};

const Card = ({ title, children }: CardPropsType) => {
  return (
    <div className={s.card}>
      <div className={s.wrapper}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Card;
