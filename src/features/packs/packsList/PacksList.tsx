import React, {useEffect, useState} from 'react';
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import s from './PackList.module.scss';
import PackItem from './packItem/PackItem';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from 'app/store';
import {setPageAC, setPageCountAC, setSortPacks} from '../packsReducer';
import PaginationC from 'common/components/Pagination/PaginationC';
import NothingFound from "common/components/NothingFound/NothingFound";
import {PackType} from "features/packs/api/packsAPI";
import {selectorSortPack} from "features/packs/selectors/selectors";
import arrow from 'assets/icons/arrpwDown.svg'
import {selectStatus} from "common/selectors/selectors";
import CircularProgress from "@mui/material/CircularProgress";

type PackListType = {
    packs: PackType[]
    totalCount: number
    page: number
    pageCount: number
}

const PackList = ({packs, pageCount, page, totalCount}: PackListType) => {
    const [down, setDown] = useState(true)
    const dispatch = useAppDispatch();
    const sortPack = useAppSelector(selectorSortPack)
    const status = useAppSelector(selectStatus)

    const onChangePagination = (pageNumber: number, pageCount: number) => {
        dispatch(setPageAC({page: pageNumber}))
        dispatch(setPageCountAC({pageCount}))
    };

    const onClickHandler = () => {
        if (sortPack === '0updated') {
            dispatch(setSortPacks({sortPacks: '1updated'}))
        } else {
            dispatch(setSortPacks({sortPacks: '0updated'}))
        }
        setDown(!down)
    }

    const sortClassName = down ? s.sortDown : s.sortDown + ' ' + s.sortUp

    return (
        <>
            {status === 'loading'
                ? <CircularProgress sx={{marginLeft: '45%', marginTop: '50px'}} size={60}/>
                :
                <>
                    <TableContainer className={s.tableContainer} component={Paper}>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow className={s.thead}>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Cover</TableCell>
                                    <TableCell align='right'>Cards</TableCell>
                                    <TableCell onClick={onClickHandler} sx={{cursor: 'pointer', position: 'relative'}}
                                               align='right'>
                                        Last Updated
                                        <img className={sortClassName} src={arrow} alt="arrow"/>
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

                    {!packs.length &&
                        <NothingFound message={'Колоды с введенным названием не найдены. Измените параметры запроса'}/>
                    }

                    <PaginationC page={page}
                                 pageCount={pageCount}
                                 totalCount={totalCount}
                                 onChangePagination={onChangePagination}
                    />
                </>
            }
        </>
    );
};

export default PackList;
