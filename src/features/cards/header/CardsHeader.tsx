import React from 'react';
import Button from "../../../common/components/Button/Button";
import Search from "../../../common/components/Search/Search";
import s from './CardsHeader.module.scss'

const CardsHeader = () => {
    return <div className={s.container}>
        <div className={s.titleAndButton}>
            <h2 className={s.title}>MyPackName</h2>
            <div className={s.btn}>
                <Button name={'Add new card'} variant={'primary'}/>
            </div>
        </div>
        <div className={s.search}>
            <Search/>
        </div>
    </div>;
};

export default CardsHeader;
