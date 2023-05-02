import React, {useEffect} from 'react';
import PackList from './packsList/PacksList';
import s from './Pack.module.scss';
import HeaderPack from './header/HeaderPack';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {selectPacks, selectPage, selectPageCount, selectTotalCount, selectUserId} from "./selectors/selectors";
import {getPacks} from "./packsReducer";

const Packs = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(selectUserId)
    const packs = useAppSelector(selectPacks);
    const totalCount = useAppSelector(selectTotalCount);
    const pageFilter = useAppSelector(selectPage);
    const pageCountFilter = useAppSelector(selectPageCount);

    useEffect(() => {
        dispatch(getPacks({userId}))
    }, [pageFilter, pageCountFilter, userId])

    return (
        <div className={s.container}>
            <HeaderPack/>
            <PackList
                packs={packs}
                totalCount={totalCount}
                pageFilter={pageFilter}
                pageCountFilter={pageCountFilter}
            />
        </div>
    );
};

export default Packs;
