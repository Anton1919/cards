import React, { useState } from 'react';
import s from './MyOrAll.module.scss';

const MyOrAll = () => {
  const [allActive, setAllActive] = useState(true);
  const [myActive, setMyActive] = useState(false);

  const handleActiveChange = () => {
    setAllActive(!allActive);
    setMyActive(!myActive);
  };

  return (
    <div className={s.container}>
      <div className={s.title}>Show packs cards</div>
      <div className={s.btnWrapper}>
        <button className={myActive ? `${s.btn} ${s.active}` : s.btn} onClick={handleActiveChange}>
          My
        </button>
        <button className={allActive ? `${s.btn} ${s.active}` : s.btn} onClick={handleActiveChange}>
          All
        </button>
      </div>
    </div>
  );
};

export default MyOrAll;
