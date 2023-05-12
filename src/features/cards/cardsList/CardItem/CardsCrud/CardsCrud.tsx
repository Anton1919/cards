import React, {useState} from 'react';
import s from './CardsCrud.module.scss'
import edit from "assets/icons/edit.svg";
import deleteIcon from "assets/icons/Delete.svg";
import DeleteCardModal from "common/components/ModalOverlay/DeleteCardModal/DeleteCardModal";
import {CardsType} from "features/cards/api/cardsAPI";
import EditCardModal from "common/components/ModalOverlay/EditCardModal/EditCardModal";

type CardCrudType = {
    card: CardsType
}

const CardsCrud = ({card}: CardCrudType) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const openEditHandler = () => {
        setIsEditOpen(true)
    }

    const closeEditHandler = () => {
        setIsEditOpen(false)
    }
    const closeHandler = () => {
        setIsEditOpen(false)
        setIsOpen(false)
    }

    const openHandler = () => {
        setIsOpen(true)
    }

    return (
        <div className={s.container}>
            <div className={s.icon}>
                {isEditOpen && <EditCardModal card={card}
                                              isOpen={isEditOpen}
                                              onClose={closeEditHandler}/>}
                <img src={edit} alt={'edit icon'} onClick={openEditHandler}/>
            </div>
            <div className={s.icon}>
                {isOpen && <DeleteCardModal cardName={card.question}
                                            cardId={card._id}
                                            isOpen={isOpen}
                                            onClose={closeHandler}/>}
                <img src={deleteIcon} alt={'delete icon'} onClick={openHandler}/>
            </div>
        </div>
    );
};

export default CardsCrud;