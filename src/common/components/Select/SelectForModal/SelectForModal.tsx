import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const SelectForModal = () => {
    const [value, setValue] = React.useState('Text');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, height: 36, margin: 0, minWidth: '100%' }} size="small">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={value}
                onChange={handleChange}
            >
                <MenuItem value={'Text'}>Text</MenuItem>
                <MenuItem value={'Picture'}>Picture</MenuItem>
            </Select>
        </FormControl>
    );
}
