import React from 'react';
import TableCell from "@mui/material/TableCell";
import CardsCrud from "./CardsCrud/CardsCrud";
import TableRow from "@mui/material/TableRow";
import {convertDate} from "utils/time";
import {CardsType} from "features/cards/api/cardsAPI";
import Rating from '@mui/material/Rating'
import s from './CardItem.module.scss'
import {useAppSelector} from "app/store";

type CardItemType = {
    card: CardsType
    isOwner: boolean
}

const CardItem = ({card, isOwner}: CardItemType) => {
    const date = convertDate(card.updated)

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            {card.questionImg
                ?   <TableCell className={s.text}>
                    <img className={s.questionImg} src={card.questionImg} alt="card question"/>
                </TableCell>
                :  <TableCell className={s.text}>{card.question}</TableCell>
            }
            <TableCell className={s.text}>{card.answer}</TableCell>
            <TableCell className={s.text} align={'center'}>{date}</TableCell>
            <TableCell>
                <Rating sx={{display: 'flex', justifyContent: 'center'}}
                        name={'read-only'}
                        value={card.grade}
                        readOnly
                />
            </TableCell>
            {isOwner && <TableCell> <CardsCrud card={card}/></TableCell>}
        </TableRow>
    );
};

export default CardItem;