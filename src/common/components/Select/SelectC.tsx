import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';

type OptionsType = {
  id: number;
  value: number;
};

type SelectCType = {
  onChangeSelect: (event: any) => void;
  options: OptionsType[];
};

const SelectC = ({ onChangeSelect, options }: SelectCType) => {
  const [pageCount, setPageCount] = React.useState('4');

  const handleChange = (event: SelectChangeEvent) => {
    onChangeSelect(event.target.value as string);
    setPageCount(event.target.value);
  };

  return (
    <Select
      size={'small'}
      labelId='demo-simple-select-label'
      id='demo-simple-select'
      value={pageCount}
      onChange={handleChange}
    >
      {options.map((el) => {
        return (
          <MenuItem key={el.id} value={el.value}>
            {el.value}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectC;
