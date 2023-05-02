import React from 'react';
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import s from './PackList.module.scss';
import PackItem from './packItem/PackItem';
import Paper from '@mui/material/Paper';
import {useAppDispatch} from '../../../app/store';
import {setPageAC, setPageCountAC} from '../packsReducer';
import PaginationC from '../../../common/components/Pagination/PaginationC';
import {PackType} from "../api/packsAPI";

type PackListType = {
    packs: PackType[]
    totalCount: number
    pageFilter: number
    pageCountFilter: number
}

const PackList = ({packs, pageCountFilter, pageFilter, totalCount}: PackListType) => {
    const dispatch = useAppDispatch();

    const onChangePagination = (pageNumber: number, pageCount: number) => {
        dispatch(setPageAC({page: pageNumber}))
        dispatch(setPageCountAC({pageCount}))
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

            <PaginationC page={pageFilter}
                         pageCount={pageCountFilter}
                         totalCount={totalCount}
                         onChangePagination={onChangePagination}
            />
        </>
    );
};

export default PackList;
