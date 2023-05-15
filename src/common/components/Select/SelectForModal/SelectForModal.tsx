import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type PropsType = {
    selectQuestion: string
    setSelectQuestion: (value: string) => void
}

export const SelectForModal = ({setSelectQuestion, selectQuestion}: PropsType) => {

    const handleChange = (event: SelectChangeEvent) => {
        setSelectQuestion(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, height: 36, margin: 0, minWidth: '100%' }} size="small">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectQuestion}
                onChange={handleChange}
            >
                <MenuItem value={'Text'}>Text</MenuItem>
                <MenuItem value={'Picture'}>Picture</MenuItem>
            </Select>
        </FormControl>
    );
}
