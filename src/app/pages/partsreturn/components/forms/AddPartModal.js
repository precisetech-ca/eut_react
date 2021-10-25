import React,{useState} from 'react'
import {
    ModalBody,
    Modal,
    ModalHeader, 
    Button,
    ModalFooter
    
} from 'reactstrap';
import { usePartsReturnUIContext } from "app/pages/partsreturn/context/PartsReturnUIContext";
import { withFormik } from 'formik';


const InnerForm = ({
    toggle,
    onHide
}) => {
    const PartsReturnUIContext = usePartsReturnUIContext();

    return (
        <Modal isOpen={PartsReturnUIContext.showAddPartModal} toggle={PartsReturnUIContext.toggleAddPartHandler} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                Information
            </ModalHeader>
            <ModalBody>
                	Please select supplier and inventory first.
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onHide}>OK</Button>{' '}
            </ModalFooter>

        </Modal>
    );
}


export const AddPartForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ temporaryData }) => {
        return {
            code: temporaryData && temporaryData.code,
        }
    },
})(InnerForm);