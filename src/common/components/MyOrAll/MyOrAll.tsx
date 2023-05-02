import React, {useState} from 'react';
import s from './MyOrAll.module.scss';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setUserId} from "../../../features/packs/packsReducer";
import {selectProfileId} from "../../../features/packs/selectors/selectors";


const MyOrAll = () => {
    const [isMy, setIsMy] = useState(false);
    const userId = useAppSelector(selectProfileId)
    const dispatch = useAppDispatch()

    const myPacksFilter = () => {
        if (userId) {
            dispatch(setUserId({userId}))
        }
        setIsMy(true)
    };

    const allPacksFilter = () => {
        dispatch(setUserId({userId: ''}))
        setIsMy(false)
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
