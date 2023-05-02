import React from 'react';
import s from './Cards.module.scss'
import BackToPackList from "../../common/components/BackToPackList/BackToPackList";
import CardsHeader from "./header/CardsHeader";
import CardsList from "./cardsList/CardsList";
import {useAppSelector} from "../../app/store";
import {
    selectCardPage, selectCardPageCount,
    selectCards,
    selectPackName,
    selectProfileID,
    selectTotalCount,
    selectUserID
} from "./selectors/selectors";
import {useParams} from "react-router-dom";

const Cards = () => {
    const profileID = useAppSelector(selectProfileID)
    const userID = useAppSelector(selectUserID)
    const packName = useAppSelector(selectPackName)
    const cards = useAppSelector(selectCards)
    const totalCount = useAppSelector(selectTotalCount)
    const page = useAppSelector(selectCardPage)
    const pageCount = useAppSelector(selectCardPageCount)
    const {packID} = useParams()
    const isOwner = profileID === userID

    return <div className={s.container}>
        <div className={s.backTo}><BackToPackList/></div>
        <CardsHeader isOwner={isOwner} packName={packName}/>
        <CardsList
            isOwner={isOwner}
            cards={cards}
            totalCount={totalCount}
            page={page}
            pageCount={pageCount}
            packID={packID}
        />
    </div>;
};

export default Cards;
