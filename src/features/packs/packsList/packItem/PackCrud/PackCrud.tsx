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

type PackCrudType = {
    packs: PackType
    usersID: string;
    packId: string
};

const PackCrud = ({usersID, packId, packs}: PackCrudType) => {
    const [deleteIsOpen, setDeleteModal] = useState(false)
    const [learnIsOpen, setLearnModal] = useState(false)
    const [editIsOpen, setEditModal] = useState(false)
    const id = useAppSelector(selectIdForPackCrud);

    const openDeleteModalHandler = () => {
        setDeleteModal(true)
    }
    const openLearnModalHandler = () => {
        setLearnModal(true)
    }
    const openEditModalHandler = () => {
        setEditModal(true)
    }

    return (
        <div className={s.container}>
            <div className={s.icon}>
                <img src={learn} alt={'learn icon'}/>
            </div>

            {usersID === id && (
                <div className={s.icon}>
                    <img src={edit} alt={'edit icon'} onClick={openEditModalHandler}/>
                    {editIsOpen && <EditPackModal
                        packs={packs}
                        isOpen={editIsOpen}
                        onClose={setEditModal}
                    />}
                </div>
            )}
            {usersID === id && (
                <div className={s.icon}>
                    <img src={deleteIcon} alt={'delete icon'} onClick={openDeleteModalHandler}/>
                    {deleteIsOpen && <DeletePackModal
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
