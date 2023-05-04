import React, {useState} from 'react';
import s from './HeaderPack.module.scss';
import Button from '../../../common/components/Button/Button';
import Search from '../../../common/components/Search/Search';
import MyOrAll from '../../../common/components/MyOrAll/MyOrAll';
import RangeSlider from '../../../common/components/RangeSlider/RangeSlider';
import reset from '../../../assets/icons/reset.svg';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {addPackTC, resetAllSettings} from '../packsReducer';
import {selectMaxCardsCount, selectorPackNameSearch} from "../selectors/selectors";

const HeaderPack = () => {
    const dispatch = useAppDispatch();
    const max = useAppSelector(selectMaxCardsCount)
    const packName = useAppSelector(selectorPackNameSearch)

    const onAddPackHandler = () => {
        dispatch(addPackTC({cardsPack: {name: 'CoCo', private: false, deckCover: ''}}));
    };

    const resetAllHandler = () => {
        dispatch(resetAllSettings({max}))
    }


    return (
        <div className={s.container}>
            <div className={s.titleWithButton}>
                <h2 className={s.title}>Packs list</h2>
                <div className={s.btn}>
                    <Button name={'Add new pack'} handler={onAddPackHandler} variant={'primary'}/>
                </div>
            </div>

            <div className={s.settingPanel}>
                <Search searchParam={packName}/>
                <MyOrAll/>
                <RangeSlider/>
                <div className={s.image}>
                    <div className={s.resetTitle}>Reset all settings</div>
                    <img src={reset} alt='reset' onClick={resetAllHandler}/>
                </div>
            </div>
        </div>
    );
};

export default HeaderPack;
