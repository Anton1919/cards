import React from 'react';
import Button from "common/components/Button/Button";
import {useAppSelector} from "app/store";
import {selectPackName} from "features/cards/selectors/selectors";
import s from './PackIsEmpty.module.scss'

const PackIsEmpty = () => {
    const packName = useAppSelector(selectPackName)
    return (
        <div className={s.container}>
            <div className={s.title}>
                <h2>{packName}</h2>
            </div>
            <div className={s.info}>
                <p>This pack is empty. Click add new card to fill this pack</p>
                <div className={s.btn}>
                    <Button name={'Add new card' } variant={'primary'} />
                </div>

            </div>
        </div>
    );
};

export default PackIsEmpty;