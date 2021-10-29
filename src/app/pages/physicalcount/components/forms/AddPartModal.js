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
    FormFeedback,
    Label
    
} from 'reactstrap';
import { usePhysicalCountUIContext } from "app/pages/physicalcount/context/PhysicalCountUIContext";
import { withFormik, Form , ErrorMessage , Field} from 'formik';
import { AddPartTable } from '../tables/AddPartTable';


const InnerForm = ({
    toggle,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    
}) => {
    const PhysicalCountUIContext = usePhysicalCountUIContext();

    return (
        <Modal isOpen={PhysicalCountUIContext.showAddPartModal} toggle={PhysicalCountUIContext.toggleAddPartHandler} size="xl"  style={{maxWidth: '1600px', width: '80%'}} centered>
            <Form onSubmit={handleSubmit}>
                <ModalHeader  toggle={toggle}>
                    Add PartT
                </ModalHeader>
                <ModalBody>
                        <AddPartTable />
                        <FormGroup row className='mt-2'>
                            <Label for="notes" sm={1} className='text-center'>Notes</Label>
                            <Col sm={7}>
                                <textarea 
                                    className="form-control form-control-sm" 
                                    name="notes" 
                                    readOnly={true}
                                    placeholder="Notes"
                                    onChange={(e) => {
                                        setFieldValue("notes", e.target.value);
                                    }}></textarea>
                            </Col>
                            <Label for="count" sm={1} className='text-center'>Count</Label>
                            <Col sm={3}>
                                <Input 
                                    size="sm" 
                                    tag={Field} 
                                    name="count" 
                                    type="number"
                                    placeholder=""
                                />
                                <ErrorMessage component={FormFeedback} name="count" />
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mt-2'>
                            <Col sm={8}>
                            </Col>
                            <Label for="uom" sm={1} className='text-center'>UOM</Label>
                            <Col sm={3}>
                                <Input 
                                    size="sm" 
                                    tag={Field} 
                                    name="uom" 
                                    readOnly={true}
                                    type="text"
                                    placeholder=""
                                />
                                <ErrorMessage component={FormFeedback} name="uom" />
                            </Col>
                        </FormGroup>     
                </ModalBody>
                <ModalFooter>
                    <Col className="text-right">
                        <Button type="button" size="sm" color="danger" >Cancel</Button> {' '}
                        <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>
                    </Col>
                </ModalFooter>
            </Form>
        </Modal>
    );
}


export const AddPartForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ temporaryData }) => {},
    handleSubmit: (values, { props: { context }, setSubmitting, resetForm }) => {
        // const {submitFormHandler} = context;
        console.log(values);
        setSubmitting(false);
        // submitFormHandler({
        //     payload: values, 
        //     setSubmitting, 
        //     resetForm
        // });
    },
})(InnerForm);