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
                

                    <AddPartTable />

                    <FormGroup row className='mt-2'>
                        <Label for="notes" sm={1} className='text-center'>Notes</Label>
                        <Col sm={7}>
                            <Input 
                            size="sm" 
                            tag={Field} 
                            name="notes" 
                            type="textarea"
                            placeholder="notes"
                            />
                            <ErrorMessage component={FormFeedback} name="notes" />
                        </Col>
                        <Label for="count" sm={1} className='text-center'>Count</Label>
                        <Col sm={3}>
                            <Input 
                            size="sm" 
                            tag={Field} 
                            name="count" 
                            type="text"
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
                            type="text"
                            placeholder=""
                            />
                            <ErrorMessage component={FormFeedback} name="uom" />
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