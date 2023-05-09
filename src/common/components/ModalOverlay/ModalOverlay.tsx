import React, {ReactNode} from 'react';
import {createPortal} from "react-dom";
import s from './ModalOverlay.module.scss'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

type ModalOverlayType = {
    children: ReactNode
    isOpen: boolean
    onClose: () => void
}

const portal = document.getElementById('portal')

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    paddingTop: 1,
    paddingBottom: 4,
    paddingLeft: 3,
    paddingRight: 3,
}

const ModalOverlay = ({children, isOpen, onClose}: ModalOverlayType) => {
    return (
        <>
            {createPortal(
                <Modal
                    onClose={onClose}
                    open={isOpen}
                >
                   <Box sx={style}>{children}</Box>
                </Modal>,
                portal as HTMLElement
            )}
        </>
    );
};

export default ModalOverlay;