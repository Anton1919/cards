import React, {ChangeEvent, useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import s from './Search.module.scss';
import {useDebounce} from "../../hooks/useDebounce";
import {useAppDispatch} from "../../../app/store";
import {setPackName} from "../../../features/packs/packsReducer";

type SearchType = {
    searchParam?: string
}

const Search = ({searchParam}: SearchType) => {
    const [value, setValue] = useState<string>(searchParam || '')
    const debounceValue = useDebounce<string>(value, 500)
    const dispatch = useAppDispatch()

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        dispatch(setPackName({packName: value}))
    }, [debounceValue])

    useEffect(() => {
        !searchParam && setValue("")
    }, [searchParam])

    return (
        <div className={s.wrapper}>
            <div className={s.title}>Search</div>
            <Paper component='form' sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}>
                <SearchIcon sx={{marginLeft: '8px', opacity: '.4'}}/>
                <InputBase
                    value={value}
                    onChange={onChangeHandler}
                    sx={{ml: 1, flex: 1}}
                    placeholder='Provide your text'
                    inputProps={{'aria-label': 'search google maps'}}
                />
            </Paper>
        </div>
    );
};

export default Search;


