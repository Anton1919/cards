import Select, {SelectChangeEvent} from '@mui/material/Select';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import {setPageCountAC} from "features/packs/packsReducer";

type OptionsType = {
    id: number;
    value: number;
};

type SelectCType = {
    onChangeSelect: (event: any) => void;
    options: OptionsType[];
    pageCount: number
};

const SelectC = ({onChangeSelect, pageCount, options}: SelectCType) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChangeSelect(event.target.value as string);
        setPageCountAC({pageCount: +event.target.value});
    };

    return (
        <Select
            size={'small'}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={pageCount.toString()}
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
