import React, {useEffect} from 'react';
import s from './Cards.module.scss'
import BackToPackList from "../../common/components/BackToPackList/BackToPackList";
import CardsHeader from "./header/CardsHeader";
import CardsList from "./cardsList/CardsList";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    selectCardPage,
    selectCardPageCount, selectCardQuestion,
    selectCards,
    selectPackName,
    selectProfileID,
    selectTotalCount,
    selectUserID
} from "./selectors/selectors";
import {useParams} from "react-router-dom";
import {getCardsTC} from "./cardsReducer";

const Cards = () => {
    const dispatch = useAppDispatch()
    const profileID = useAppSelector(selectProfileID)
    const userID = useAppSelector(selectUserID)
    const packName = useAppSelector(selectPackName)
    const cards = useAppSelector(selectCards)
    const totalCount = useAppSelector(selectTotalCount)
    const page = useAppSelector(selectCardPage)
    const pageCount = useAppSelector(selectCardPageCount)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const {packID} = useParams()
    const isOwner = profileID === userID

    useEffect(() => {
        dispatch(getCardsTC({cardsId: packID}))
    }, [page, pageCount, cardQuestion])

    return <div className={s.container}>
        <div className={s.backTo}><BackToPackList/></div>
        <CardsHeader isOwner={isOwner} packName={packName}/>
        <CardsList
            isOwner={isOwner}
            totalCount={totalCount}
            page={page}
            pageCount={pageCount}
        />
    </div>;
};

export default Cards;
