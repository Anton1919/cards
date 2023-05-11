import React, {useState} from 'react';
import Button from "common/components/Button/Button";
import {useAppSelector} from "app/store";
import {selectPackName} from "features/cards/selectors/selectors";
import s from './PackIsEmpty.module.scss'
import AddNewCardModal from "common/components/ModalOverlay/AddNewCardModal/AddNewCardModal";

const PackIsEmpty = () => {
    const [isOpen, setIsOpen] = useState(false)
    const packName = useAppSelector(selectPackName)

    const openModalHandler = () => {
        setIsOpen(true)
    }

    const closeModalHandler = () => {
        setIsOpen(false)
    }

    return (
        <div className={s.container}>
            {isOpen && <AddNewCardModal isOpen={isOpen} onClose={closeModalHandler} />}
            <div className={s.title}>
                <h2>{packName}</h2>
            </div>
            <div className={s.info}>
                <p>This pack is empty. Click add new card to fill this pack</p>
                <div className={s.btn}>
                    <Button name={'Add new card' } variant={'primary'} handler={openModalHandler} />
                </div>

            </div>
        </div>
    );
};

export default PackIsEmpty;