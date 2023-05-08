import React from 'react';
import Button from "common/components/Button/Button";
import Search from "common/components/Search/Search";
import s from './CardsHeader.module.scss'
import {useAppSelector} from "app/store";
import {selectCardQuestion} from "features/cards/selectors/selectors";
import {setCardQuestion} from "features/cards/cardsReducer";
import settingsCard from 'assets/icons/settingsCard.svg'

type CardsHeaderType = {
    isOwner: boolean
    packName: string
}

const CardsHeader = ({isOwner, packName}: CardsHeaderType) => {
    const cardQuestion = useAppSelector(selectCardQuestion)

    return <div className={s.container}>
        <div className={s.titleAndButton}>
            <div className={s.titleWrapper}>
                <h2 className={s.title}>{packName}</h2>
                {isOwner && <img src={settingsCard} alt="settings"/>}
            </div>
            <div className={s.btn}>
                <Button name={'Add new card'} variant={'primary'}/>
            </div>
        </div>
        <div className={s.search}>
            <Search searchParam={cardQuestion} actionCreator={setCardQuestion}/>
        </div>
    </div>;
};

export default CardsHeader;
