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
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {selectCardPage, selectCardPageCount, selectCards, selectTotalCount} from "../selectors/selectors";
import {getCardsTC} from "../cardsReducer";
import {useParams} from "react-router-dom";

const CardsList = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(selectCards)
    const totalCount = useAppSelector(selectTotalCount)
    const page = useAppSelector(selectCardPage)
    const pageCount = useAppSelector(selectCardPageCount)
    const {packID} = useParams()

    useEffect(() => {
        dispatch(getCardsTC(packID))
    }, [])

    // Начинай с этого места
    const onChangePagination = (pageNumber: number, pageCount: number) => {
        // dispatch(getCardsTC({page: pageNumber, pageCount: pageCount}));
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
                            <TableCell align={'right'}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cards.map((el) => {
                            return (
                                <CardItem key={el._id} card={el}/>
                            )
                        })}

                    </TableBody>

                </Table>
            </TableContainer>

            <PaginationC totalCount={totalCount} page={page} pageCount={pageCount} onChangePagination={() => {
            }}/>
        </>
    );
};

export default CardsList;