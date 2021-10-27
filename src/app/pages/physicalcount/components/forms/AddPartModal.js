import React,{useState} from 'react'
import {
    ModalBody,
    Modal,
    ModalHeader, 
    Button,
    ModalFooter,
    FormGroup,
    Input,
    Col,
    FormFeedback
    
} from 'reactstrap';
import { usePhysicalCountUIContext } from "app/pages/physicalcount/context/PhysicalCountUIContext";
import { withFormik, Form , ErrorMessage , Field} from 'formik';


const InnerForm = ({
    toggle,
    handleSubmit,
    isSubmitting,
    backToHome
}) => {
    const PhysicalCountUIContext = usePhysicalCountUIContext();

    return (
        <Modal isOpen={PhysicalCountUIContext.showAddPartModal} toggle={PhysicalCountUIContext.toggleAddPartHandler} size="xl"  style={{maxWidth: '1600px', width: '80%'}} centered>
            <ModalHeader  toggle={toggle}>
                Add PartT
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Col sm={3}>
                            <Input 
                            size="sm" 
                            tag={Field} 
                            name="name" 
                            type="text"
                            placeholder="Name"
                            />
                            <ErrorMessage component={FormFeedback} name="name" />
                        </Col>

                        <Col sm={3}>
                            <Input 
                            size="sm" 
                            tag={Field} 
                            name="sku" 
                            type="text"
                            placeholder="Quick Search (SKU,*)"
                            />
                            <ErrorMessage component={FormFeedback} name="sku" />
                        </Col>

                        <Col sm={3}>
                            <Button type="button" size="sm" block color="success">Search</Button>
                        </Col>
                        <Col sm={1}>
                            <Button type="button" size="sm" block color="danger">Clear</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" >Cancel</Button> {' '}
                    <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>
                </Col>
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