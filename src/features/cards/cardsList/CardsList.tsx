import React, {useEffect} from 'react';
import TableContainer from "@mui/material/TableContainer";
import s from "../Cards.module.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CardItem from "./CardItem/CardItem";
import PaginationC from "common/components/Pagination/PaginationC";
import {useAppDispatch, useAppSelector} from "app/store";
import NothingFound from "common/components/NothingFound/NothingFound";
import {setCardPage, setCardPageCount} from "features/cards/cardsReducer";
import {selectCards} from "features/cards/selectors/selectors";
import {selectStatus} from "common/selectors/selectors";
import CircularProgress from "@mui/material/CircularProgress";

type CardsListType = {
    totalCount: number
    page: number
    pageCount: number
    isOwner: boolean
}

const CardsList = ({isOwner, page, pageCount, totalCount}: CardsListType) => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(selectCards)
    const status = useAppSelector(selectStatus)

    const onChangePagination = (pageNumber: number, pageCount: number) => {
        dispatch(setCardPage({cardPage: pageNumber}))
        dispatch(setCardPageCount({pageCount}))
    };

    return (
        <> {status === "loading"
            ? <CircularProgress sx={{marginLeft: '45%', marginTop: '50px'}} size={60}/>
            :
            <>
                <TableContainer className={s.tableContainer} component={Paper}>
                    <Table sx={{minWidth: 650}}>
                        <TableHead>
                            <TableRow className={s.thead}>
                                <TableCell>Question</TableCell>
                                <TableCell>Answer</TableCell>
                                <TableCell align={'center'}>Last Updated</TableCell>
                                <TableCell align={'center'}>Grade</TableCell>
                                {isOwner && <TableCell align={'right'}>Actions</TableCell>}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {cards.map((el) => {
                                return (
                                    <CardItem key={el._id} card={el} isOwner={isOwner}/>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {!cards.length &&
                    <NothingFound
                        message={'В данной колоде нету карточек, удовлетворяющих поиску. Измените параметры запроса'}/>
                }

                <PaginationC totalCount={totalCount} page={page} pageCount={pageCount}
                             onChangePagination={onChangePagination}
                />
            </>
        }
        </>
    )
}

export default CardsList;