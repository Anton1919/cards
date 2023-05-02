import React from 'react';
import TableCell from "@mui/material/TableCell";
import Grade from "../../../../common/components/Grade/Grade";
import CardsCrud from "./CardsCrud/CardsCrud";
import TableRow from "@mui/material/TableRow";
import {CardsType} from "../../api/cardsAPI";
import {convertDate} from "../../../../utils/time";

type CardItemType = {
    card: CardsType
    isOwner: boolean
}

const CardItem = ({card, isOwner}: CardItemType) => {
    const date = convertDate(card.updated)

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell>{card.question}</TableCell>
            <TableCell>{card.answer}</TableCell>
            <TableCell align={'center'}>{date}</TableCell>
            <TableCell>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Grade/>
                    <Grade/>
                    <Grade/>
                    <Grade/>
                    <Grade/>
                </div>
            </TableCell>
            {isOwner && <TableCell> <CardsCrud/></TableCell>}
        </TableRow>
    );
};

export default CardItem;