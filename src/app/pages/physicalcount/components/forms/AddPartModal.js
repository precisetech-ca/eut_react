import React,{useState} from 'react'
import {
    ModalBody,
    Modal,
    ModalHeader, 
    Button,
    ModalFooter
    
} from 'reactstrap';
import { usePhysicalCountUIContext } from "app/pages/physicalcount/context/PhysicalCountUIContext";
import { withFormik } from 'formik';


const InnerForm = ({
    toggle,
}) => {
    const PhysicalCountUIContext = usePhysicalCountUIContext();

    return (
        <Modal isOpen={PhysicalCountUIContext.showAddPartModal} toggle={PhysicalCountUIContext.toggleAddPartHandler} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                Information
            </ModalHeader>
            <ModalBody>
                	Please select supplier and inventory first.
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={PhysicalCountUIContext.toggleAddPartHandler}>OK</Button>{' '}
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