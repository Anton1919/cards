import React, {useState} from 'react';
import s from './PackCrud.module.scss';
import learn from 'assets/icons/learn.svg';
import deleteIcon from 'assets/icons/Delete.svg';
import edit from 'assets/icons/edit.svg';
import {useAppSelector} from 'app/store';
import {selectIdForPackCrud} from "../../../selectors/selectors";
import DeletePackModal from "common/components/ModalOverlay/DeletePackModal/DeletePackModal";
import EditPackModal from "common/components/ModalOverlay/EditPackModal/EditPackModal";
import {PackType} from "features/packs/api/packsAPI";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";

type PackCrudType = {
    packs: PackType
    usersID: string;
    packId: string
};

const PackCrud = ({usersID, packId, packs}: PackCrudType) => {
    const [deleteIsOpen, setDeleteModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const id = useAppSelector(selectIdForPackCrud);
    const disabled = packs.cardsCount === 0

    const openDeleteModalHandler = () => {
        setDeleteModal(true)
    }
    const openEditModalHandler = () => {
        setIsOpen(true)
    }

    const onClosePackModal = () => [
        setIsOpen(false)
    ]

    return (
        <div className={s.container}>

            <IconButton size={'small'} disabled={disabled} className={disabled ? `${s.btn} ${s.disabled}` : s.btn}>
                <Link to={`/learn/${packs._id}`}>
                    <img src={learn} alt={'learn icon'}/>
                </Link>
            </IconButton>

            {usersID === id && (
                <div className={s.icon}>
                    <img src={edit} alt={'edit icon'} onClick={openEditModalHandler}/>
                    {isOpen && <EditPackModal
                        packs={packs}
                        isOpen={isOpen}
                        onClose={onClosePackModal}
                    />}
                </div>
            )}
            {usersID === id && (
                <div className={s.icon}>
                    <img src={deleteIcon} alt={'delete icon'} onClick={openDeleteModalHandler}/>
                    {deleteIsOpen && <DeletePackModal
                        packName={packs.name}
                        packId={packId}
                        isOpen={deleteIsOpen}
                        onClose={setDeleteModal}
                    />}
                </div>
            )}
        </div>
    );
};

export default PackCrud;
