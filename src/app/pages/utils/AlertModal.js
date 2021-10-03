import React from 'react'
import {
    ModalBody,
    Modal,
    ModalFooter,
    ModalHeader, 
    Button,
} from 'reactstrap';

export const AlertModal = ({headerTitle, modal, toggle, bodyDescription, expectedModalCloseHandler}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                {headerTitle}
            </ModalHeader>
            <ModalBody>
                {bodyDescription}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={expectedModalCloseHandler}>Yes</Button>
                <Button color="primary" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal>
    )
}

AlertModal.defaultProps = {
    headerTitle: "Confirmation",
    bodyDescription: "All unsaved changes will be lost. Are you sure you want to continue?",
}
