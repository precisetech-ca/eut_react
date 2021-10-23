import React, {useState} from 'react'
import {
    Label,
    FormGroup,
    Input,
    FormFeedback,
    ModalBody,
    Modal,
    Row, 
    Col,
    ModalFooter,
    ModalHeader, 
    Button,
} from 'reactstrap';
import { usePartsReturnUIContext } from "app/pages/partsreturn/context/PartsReturnUIContext";
import * as Yup from "yup";


const InnerForm = ({
    toggle
}) => {
    const PartsReturnUIContext = usePartsReturnUIContext();
    const { warehouseMockData} = PartsReturnUIContext;

    return (
        <Modal isOpen={PartsReturnUIContext.showSupplierModal} toggle={PartsReturnUIContext.toggleSupplierHandler} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                Information
            </ModalHeader>
            <ModalBody>
                	Please select supplier and inventory first.
            </ModalBody>

        </Modal>
    );
}


export const SupplierForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ temporaryData }) => {
        return {
            code: temporaryData && temporaryData.code,
           

        }
    },
})(InnerForm);