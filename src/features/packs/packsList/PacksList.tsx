import React, {useEffect} from 'react';
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import s from './PackList.module.scss';
import PackItem from './packItem/PackItem';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {getPacks} from '../packsReducer';
import {selectPacks, selectPage, selectPageCount, selectTotalCount} from '../selectors/selectors';
import PaginationC from '../../../common/components/Pagination/PaginationC';

const PackList = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector(selectPacks);
    const totalCount = useAppSelector(selectTotalCount);
    const page = useAppSelector(selectPage);
    const pageCount = useAppSelector(selectPageCount);

    useEffect(() => {
        dispatch(getPacks({page: 1, pageCount: 4}));
    }, []);

    const onChangePagination = (pageNumber: number, pageCount: number) => {
        dispatch(getPacks({page: pageNumber, pageCount: pageCount}));
    };

    return (
        <>
            <TableContainer className={s.tableContainer} component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow className={s.thead}>
                            <TableCell>Name</TableCell>
                            <TableCell>Cover</TableCell>
                            <TableCell align='right'>Cards</TableCell>
                            <TableCell sx={{cursor: 'pointer'}} align='right'>
                                Last Updated
                            </TableCell>
                            <TableCell align='right'>Created by</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {packs.map((el) => {
                            return <PackItem key={el._id} packs={el}/>;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <PaginationC page={page} pageCount={pageCount} totalCount={totalCount}
                         onChangePagination={onChangePagination}/>
        </>
    );
};

export default PackList;
