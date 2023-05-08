import React from 'react';
import s from './MyOrAll.module.scss';
import {useAppDispatch, useAppSelector} from "app/store";
import {setIsMy, setUserId} from "features/packs/packsReducer";
import {selectIsMy, selectProfileId} from "features/packs/selectors/selectors";

const MyOrAll = () => {
    const userId = useAppSelector(selectProfileId)
    const isMy = useAppSelector(selectIsMy)
    const dispatch = useAppDispatch()

    const myPacksFilter = () => {
        if (userId) {
            dispatch(setUserId({userId}))
        }
        dispatch(setIsMy({value: true}))
    };

    const allPacksFilter = () => {
        dispatch(setUserId({userId: ''}))
        dispatch(setIsMy({value: false}))
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
