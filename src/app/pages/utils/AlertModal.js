import React from 'react'
import {
    ModalBody,
    Modal,
    ModalFooter,
    ModalHeader, 
    Button,
} from 'reactstrap';

export const AlertModal = ({headerTitle, modal, toggle, bodyDescription, callbackHandler}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} size="md" centered>
            <ModalHeader  toggle={toggle}>
                {headerTitle}
            </ModalHeader>
            <ModalBody>
                {bodyDescription}
            </ModalBody>
            <ModalFooter>
                <Button color="success" size="sm" onClick={callbackHandler}>Yes</Button>
                <Button color="secondary" size="sm" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal>
    )
}

AlertModal.defaultProps = {
    headerTitle: "Are you sure? ",
    bodyDescription: "You cannot revert your changes?",
}
