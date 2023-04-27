import React, { useState } from 'react';
import { Slider } from '@mui/material';
import s from './RangeSlider.module.scss';

const RangeSlider = () => {
  const [value, setValue] = useState<number[]>();

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Number of cards</div>
      <div className={s.slider}>
        <span className={s.value}>{0}</span>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          // onChange={handleChange}
          valueLabelDisplay='auto'
          // onChangeCommitted={onChangeCommittedHandler}
          // max={maxValue}
          // min={minValue}
          // disabled={isDisabled}
        />
        <span className={s.value}>{1}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
