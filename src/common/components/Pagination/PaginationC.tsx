import React from 'react';
import s from './Pagination.module.scss';
import Pagination from '@mui/material/Pagination';
import SelectC from "common/components/Select/SelectC";

type PaginationType = {
    totalCount: number;
    page: number;
    pageCount: number;
    onChangePagination: (pageNumber: number, pageCount: number) => void;
};

const PaginationC = ({totalCount, onChangePagination, pageCount, page}: PaginationType) => {
    const lastPage = Math.ceil(totalCount / pageCount);

    const options = [
        {id: 4, value: 4},
        {id: 8, value: 8},
        {id: 12, value: 12},
    ];

    const onChangeCallback = (event: any, page: number) => {
        onChangePagination(page, pageCount);
    };

    const onChangeSelect = (event: number) => {
        onChangePagination(page, event);
    };

    return (
        <div className={s.container}>
            <div className={s.pages}>
                <Pagination page={page} count={lastPage} onChange={onChangeCallback}/>
            </div>
            <div className={s.selectWrapper}>
                Show <SelectC pageCount={pageCount} options={options} onChangeSelect={onChangeSelect}/>
                Cards per Page
            </div>
        </div>
    );
};

export default PaginationC;
