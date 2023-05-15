import React, {useEffect} from 'react';
import s from './Cards.module.scss'
import BackToPackList from "common/components/BackToPackList/BackToPackList";
import CardsHeader from "./header/CardsHeader";
import CardsList from "./cardsList/CardsList";
import {useAppDispatch, useAppSelector} from "app/store";
import {
    selectCardPage,
    selectCardPageCount,
    selectCardQuestion,
    selectCards, selectDeckCover,
    selectPackName,
    selectProfileID,
    selectTotalCount,
    selectUserID
} from "./selectors/selectors";
import {Navigate, useParams} from "react-router-dom";
import {getCardsTC} from "./cardsReducer";
import {PATHS} from "common/routes/PATHS";
import {selectIsLoggedIn} from "common/selectors/selectors";
import PackIsEmpty from 'common/components/Pack_is_Empty/PackIsEmpty';

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
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {packID} = useParams()
    const isOwner = profileID === userID
    const packDeckCover = useAppSelector(selectDeckCover)

    useEffect(() => {
        dispatch(getCardsTC({cardsId: packID}))
    }, [page, pageCount, cardQuestion])

    if (!isLoggedIn) {
        return <Navigate to={PATHS.login}/>
    }

    return <div className={s.container}>
        <div className={s.backTo}>
            <BackToPackList/>
        </div>

        {!cards.length && isOwner
            ? <PackIsEmpty/>
            : <>
                <CardsHeader packDeckCover={packDeckCover} isOwner={isOwner} packName={packName} packID={packID ?? ''}/>
                <CardsList
                    isOwner={isOwner}
                    totalCount={totalCount}
                    page={page}
                    pageCount={pageCount}
                />
            </>
        }


    </div>;
};

export default Cards;
