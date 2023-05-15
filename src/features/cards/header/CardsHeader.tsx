import React, {useState} from 'react';
import Button from "common/components/Button/Button";
import Search from "common/components/Search/Search";
import s from './CardsHeader.module.scss'
import {useAppSelector} from "app/store";
import {selectCardQuestion} from "features/cards/selectors/selectors";
import {setCardQuestion} from "features/cards/cardsReducer";
import settingsCard from 'assets/icons/settingsCard.svg'
import AddNewCardModal from "common/components/ModalOverlay/AddNewCardModal/AddNewCardModal";
import CollapseMenu from "common/components/CollapseMenu/collapseMenu";
import editIcon from "assets/icons/edit.svg";
import deleteIcon from "assets/icons/Delete.svg";
import learnIcon from "assets/icons/learn.svg";
import EditPackModal from "common/components/ModalOverlay/EditPackModal/EditPackModal";
import DeletePackModal from "common/components/ModalOverlay/DeletePackModal/DeletePackModal";
import defaultDeckCover from 'assets/image/coverDefault.png'
import {selectStatus} from "common/selectors/selectors";

type CardsHeaderType = {
    packDeckCover: string
    packID: string
    isOwner: boolean
    packName: string
}

const CardsHeader = ({isOwner, packName, packID, packDeckCover}: CardsHeaderType) => {
    const [isOpenEditModal, setEditModal] = useState(false)
    const [isOpenDeleteModal, setDeleteModal] = useState(false)
    const [isOpenAddNewCard, setAddModal] = useState(false)
    const cardQuestion = useAppSelector(selectCardQuestion)
    const [collapsed, setCollapsed] = useState(false)
    const status = useAppSelector(selectStatus)

    const onCloseEditModal = () => {
        setEditModal(false)
    }
    const onCloseDeleteModal = () => {
        setDeleteModal(false)
    }

    const onCloseAddCardModal = () => {
        setAddModal(false)
    }

    const editModalHandler = () => {
        setEditModal(true)
    }

    const deleteModalHandler = () => {
        setDeleteModal(true)
    }

    const addCardModalHandler = () => {
        setAddModal(true)
    }

    const onBlurHandler = () => {
        setCollapsed(false);
    };

    const contentData = [
        {id: 0, icon: editIcon, title: 'Edit', handler: editModalHandler},
        {id: 1, icon: deleteIcon, title: 'Delete', handler: deleteModalHandler},
        {
            id: 2, icon: learnIcon, link: `/learn/${packID}`, title: 'Learn', handler: () => {
            }
        },
    ]

    return <div className={s.container}>
        {isOpenAddNewCard && <AddNewCardModal isOpen={isOpenAddNewCard} onClose={onCloseAddCardModal}/>}

        {isOpenEditModal && <EditPackModal packId={packID}
                                           packDeckCover={packDeckCover}
                                           packNameFromProps={packName}
                                           isOpen={isOpenEditModal}
                                           onClose={onCloseEditModal}
        />}

        {isOpenDeleteModal && <DeletePackModal packName={packName}
                                               packId={packID}
                                               isOpen={isOpenDeleteModal}
                                               onClose={onCloseDeleteModal}
        />}

        <div className={s.titleAndButton}>
            <div className={s.titleWrapper} onBlur={onBlurHandler} tabIndex={1}>
                <h2 className={s.title}>{packName}</h2>
                {isOwner &&
                    <div onClick={() => setCollapsed(true)} style={{display: 'flex', alignItems: 'center'}}>
                        <img src={settingsCard} alt="settings"/>
                    </div>
                }
                {collapsed &&
                    <div className={s.collapsed}>
                        <CollapseMenu contentData={contentData}/>
                    </div>
                }
            </div>
            <div className={s.btn}>
                {isOwner ? <Button name={'Add new card'} variant={'primary'} handler={addCardModalHandler}/> :
                    <Button name={'Learn to pack'} variant={'primary'}/>}
            </div>
        </div>

        {status === 'loading' ? '' :
            <div className={s.packDeckCover}>
                <img src={packDeckCover ? packDeckCover : defaultDeckCover} alt="pack deck cover"/>
            </div>
        }

        <div className={s.search}>
            <Search searchParam={cardQuestion} actionCreator={setCardQuestion}/>
        </div>
    </div>;
};

export default CardsHeader;
