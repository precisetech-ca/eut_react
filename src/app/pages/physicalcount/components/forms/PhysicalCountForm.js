import React, {useEffect, useState} from 'react'
import {
    Label,
    FormGroup,
    Input,
    FormFeedback,
    Row, 
    Col,
    Button,
} from 'reactstrap';
import { Field, ErrorMessage, withFormik, Form } from 'formik';
import { usePhysicalCountUIContext } from "../../context/PhysicalCountUIContext";
import Select from 'react-select'
import dateFormat from 'dateformat';

const InnerForm = ({
    isSubmitting,
    handleSubmit,
    setFieldValue,
    backToHome,
    isViewable,
}) => {
    const PhysicalCountUIContext = usePhysicalCountUIContext();
    const { warehouseMockData} = PhysicalCountUIContext;
    const reactSelectStyles = {
        control: base => ({
            ...base,
            borderColor: "#757578",
            minHeight: '34px',
            height: '34px',
        })
    };

    useEffect(() => {
        setFieldValue("po_date", dateFormat(new Date(), "isoDateTime"));
    }, [])

    return (
        <Form onSubmit={handleSubmit}>

            <FormGroup row>
                <Label for="pc_num" sm={1}>PC #</Label>
                <Col sm={5}>
                    <Input 
                        size="sm" 
                        tag={Field} 
                        name="pc_num" 
                        readOnly={true}
                        disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="pc_num" />
                </Col>
                <Label for="credit_no" sm="1">Inventory<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Select options={warehouseMockData} styles={reactSelectStyles} />
                    <ErrorMessage component={FormFeedback} name="Date" />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="pc_date" sm={1}>PC Date<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Input
                        type="date"
                        name="pc_date"
                        id="pc_date"
                        size="sm"
                        placeholder="10/24/2021 01:14:04 AM"
                        disabled={isViewable}
                    />
                </Col>
                <Label for="notes" sm={1}>Notes<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Input
                            type="textarea"
                            name="notes"
                            id="notes"
                            size="sm"
                            placeholder=""
                            disabled={isViewable}
                        />
                        <ErrorMessage component={FormFeedback} name="Notes" />
                </Col>
               
            </FormGroup>
            <FormGroup row>
                <Label for="finalized" sm={1}>Finalized</Label>
                <Col sm={5}>
                        <Input
                            type="text"
                            name="notes"
                            id="notes"
                            size="sm"
                            placeholder=""
                            disabled={isViewable}
                        />
                </Col>

            </FormGroup>
            {!isViewable && <Row>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Cancel</Button> {' '}
                    <Button color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>
                </Col>
            </Row>}

            {isViewable && <Row>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Close</Button> {' '}
                </Col>
            </Row>}
            
        </Form>
    );
}


export const PhysicalCountForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ temporaryData }) => {
        return {
            notes: temporaryData && temporaryData.notes,
            phone: temporaryData && temporaryData.phone,
        }
    },
    handleSubmit: (values, { props: { submitHandler }, setSubmitting }) => {
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
        console.log(values);
        // submitHandler({payload: values, closeModal, setSubmitting, resetForm});
    },
})(InnerForm);
