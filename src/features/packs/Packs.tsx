import React from 'react';
import PackList from './packsList/PacksList';
import s from './Pack.module.scss';
import HeaderPack from './header/HeaderPack';

const Packs = () => {
  return (
    <div className={s.container}>
      <HeaderPack />
      <PackList />
    </div>
  );
};

export default Packs;
