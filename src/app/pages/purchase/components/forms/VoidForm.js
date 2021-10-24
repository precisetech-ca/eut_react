import React from 'react'
import {
    Label,
    FormGroup,
    Input,
    ModalBody,
    Modal,
    Col,
    ModalFooter,
    ModalHeader, 
    Button,
} from 'reactstrap';
import { Field, withFormik, Form } from 'formik';
import { useUIContext } from "app/pages/purchase/context/UIContext";
import * as Yup from "yup";

const InnerForm = ({
    handleSubmit,
    toggle,
}) => {
    const UIContext = useUIContext();
    return (
        <Modal isOpen={UIContext.voidModal} toggle={UIContext.toggleVoidHandler} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                Void Notes
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <FormGroup row>
                        <Label for="void_notes" sm={2}>Void Notes</Label>
                        <Col sm={10}>
                            <Input 
                                size="sm" 
                                type="textarea"
                                name="void_notes" 
                            />
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={UIContext.toggleVoidHandler}>Cancel</Button>
                    <Button color="primary">Save</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}


export const VoidForm = withFormik({
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
        code: Yup.string().required("Code is required"),
    }),
    handleSubmit: (values, { props: { submitHandler }, setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        // submitHandler({payload: values, closeModal, setSubmitting, resetForm});
    },
})(InnerForm);