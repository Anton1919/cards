import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import s from './Search.module.scss';

const Search = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Search</div>
      <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Provide your text'
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <SearchIcon />
      </Paper>
    </div>
  );
};

export default Search;
