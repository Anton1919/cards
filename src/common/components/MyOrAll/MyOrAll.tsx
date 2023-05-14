import React from 'react';
import s from './MyOrAll.module.scss';
import {useAppDispatch, useAppSelector} from "app/store";
import { setFilterPacks, setIsMy, setMax, setMin, setUserId} from "features/packs/packsReducer";
import {
    selectIsMy,
    selectMaxCardsCount,
    selectMinCardsCount,
    selectProfileId
} from "features/packs/selectors/selectors";

const MyOrAll = () => {
    const userId = useAppSelector(selectProfileId)
    const isMy = useAppSelector(selectIsMy)
    const dispatch = useAppDispatch()
    const maxValue = useAppSelector(selectMaxCardsCount)
    const minValue = useAppSelector(selectMinCardsCount)

    const myPacksFilter = () => {
        dispatch(setFilterPacks({userId, min: minValue, max: maxValue, isMy: true}))
    };

    const allPacksFilter = () => {
        dispatch(setFilterPacks({userId: "", min: minValue, max: maxValue, isMy: false}))
    };

    return (
        <div className={s.container}>
            <div className={s.title}>Show packs cards</div>
            <div className={s.btnWrapper}>
                <button className={isMy ? `${s.btn} ${s.active}` : s.btn} onClick={myPacksFilter}>
                    My
                </button>
                <button className={!isMy ? `${s.btn} ${s.active}` : s.btn} onClick={allPacksFilter}>
                    All
                </button>
            </div>
        </div>
    );
};

export default MyOrAll;
