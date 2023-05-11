import React, {useState} from 'react';
import Button from "common/components/Button/Button";
import Search from "common/components/Search/Search";
import s from './CardsHeader.module.scss'
import {useAppSelector} from "app/store";
import {selectCardQuestion} from "features/cards/selectors/selectors";
import {setCardQuestion} from "features/cards/cardsReducer";
import settingsCard from 'assets/icons/settingsCard.svg'
import AddNewPackModal from "common/components/ModalOverlay/AddNewPackModal/AddNewPackModal";
import AddNewCardModal from "common/components/ModalOverlay/AddNewCardModal/AddNewCardModal";
import {CardsType} from "features/cards/api/cardsAPI";

type CardsHeaderType = {
    isOwner: boolean
    packName: string
}

const CardsHeader = ({isOwner, packName}: CardsHeaderType) => {
    const [isOpen, setIsOpen] = useState(false)
    const cardQuestion = useAppSelector(selectCardQuestion)

    const onOpenModal = () => {
        setIsOpen(true)
    }

    const onCloseModal = () => {
        setIsOpen(false)
    }

    return <div className={s.container}>
        {isOpen &&  <AddNewCardModal isOpen={isOpen} onClose={onCloseModal} /> }
        <div className={s.titleAndButton}>
            <div className={s.titleWrapper}>
                <h2 className={s.title}>{packName}</h2>
                {isOwner && <img src={settingsCard} alt="settings"/>}
            </div>
            <div className={s.btn}>
                {isOwner ? <Button name={'Add new card'} variant={'primary'} handler={onOpenModal}/> : <Button name={'Learn to pack'} variant={'primary'}/>}
            </div>
        </div>
        <div className={s.search}>
            <Search searchParam={cardQuestion} actionCreator={setCardQuestion}/>
        </div>
    </div>;
};

export default CardsHeader;
