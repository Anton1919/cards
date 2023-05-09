import React, {useEffect} from 'react';
import PackList from './packsList/PacksList';
import s from './Pack.module.scss';
import HeaderPack from './header/HeaderPack';
import {useAppDispatch, useAppSelector} from "app/store";
import {
    selectMax,
    selectMin,
    selectorPackNameSearch,
    selectorSortPack,
    selectPacks,
    selectPage,
    selectPageCount,
    selectTotalCount,
    selectUserId
} from "./selectors/selectors";
import {getPacks} from "./packsReducer";
import {selectIsLoggedIn} from "common/selectors/selectors";
import {Navigate} from "react-router-dom";
import {PATHS} from "common/routes/PATHS";
import {selectPackName} from "features/cards/selectors/selectors";

const Packs = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(selectUserId)
    const packs = useAppSelector(selectPacks);
    const totalCount = useAppSelector(selectTotalCount);
    const page = useAppSelector(selectPage);
    const pageCount = useAppSelector(selectPageCount);
    const min = useAppSelector(selectMin)
    const max = useAppSelector(selectMax)
    const sortPack = useAppSelector(selectorSortPack)
    const packName = useAppSelector(selectorPackNameSearch)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const cardName = useAppSelector(selectPackName)

    useEffect(() => {
        dispatch(getPacks({userId}))
    }, [page, pageCount, userId, min, max, sortPack, packName , cardName])

    if (!isLoggedIn) {
        return <Navigate to={PATHS.login}/>
    }

    return (
        <div className={s.container}>
            <HeaderPack/>
            <PackList
                packs={packs}
                totalCount={totalCount}
                page={page}
                pageCount={pageCount}
            />
        </div>
    );
};

export default Packs;
