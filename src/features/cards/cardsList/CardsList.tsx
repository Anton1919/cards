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
import PaginationC from "../../../common/components/Pagination/PaginationC";
import {useAppDispatch} from "../../../app/store";
import {getCardsTC} from "../cardsReducer";
import {CardsType} from "../api/cardsAPI";

type CardsListType = {
    cards: CardsType[]
    totalCount: number
    page: number
    pageCount: number
    packID: string | undefined
    isOwner: boolean
}

const CardsList = ({isOwner, cards, page, pageCount, totalCount, packID}: CardsListType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardsTC({page: page, pageCount: pageCount, cardsId: packID}))
    }, [])

    const onChangePagination = (pageNumber: number, pageCount: number) => {
        dispatch(getCardsTC({page: pageNumber, pageCount: pageCount, cardsId: packID}));
    };

    return (
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

            <PaginationC totalCount={totalCount} page={page} pageCount={pageCount}
                         onChangePagination={onChangePagination}/>
        </>
    );
};

export default CardsList;