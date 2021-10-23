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
import { usePartsReturnUIContext } from "app/pages/partsreturn/context/PartsReturnUIContext";
import * as Yup from "yup";
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select'
import InputMask from 'react-input-mask';
import dateFormat from 'dateformat';

const InnerForm = ({
    isSubmitting,
    handleSubmit,
    setFieldValue,
    handleChange,
    handleBlur,
    values,
    backToHome,
    isViewable,
}) => {
    const PartsReturnUIContext = usePartsReturnUIContext();
    const {toggleSupplierHandler, warehouseMockData} = PartsReturnUIContext;
    const [value, onChange] = useState(new Date());
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
            <Row className="mb-3">
                <Col className="col-lg-8">
                </Col>
                {/* <Col>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="completed" disabled={true} />{' '}
                            Completed
                        </Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="void" disabled={isViewable}/>{' '}
                            Void
                        </Label>
                    </FormGroup>
                </Col> */}
            </Row>
    
            <FormGroup row>
                <Label for="return_part_no" sm={1}>Return Part #</Label>
                <Col sm={3}>
                    <Input 
                        size="sm" 
                        tag={Field} 
                        name="return_part_no" 
                        readOnly={true}
                        disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="return_part_no" />
                </Col>
                <Label for="credit_no" sm="1">Credit # <span className="text-danger">*</span></Label>
                <Col sm={3}>
                        <Input
                            type="text"
                            name="credit_no"
                            id="credit_no"
                            size="sm"
                            placeholder="credit no"
                            disabled={isViewable}
                        />
                    <ErrorMessage component={FormFeedback} name="Date" />
                </Col>
                <Label for="notes" sm="1">Notes</Label>
                <Col sm="3">
                    <Input
                            type="text"
                            name="notes"
                            id="notes"
                            size="sm"
                            placeholder="Notes"
                            disabled={isViewable}
                        />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="parts_return_listing" sm={1}>Parts Return Listing</Label>
                <Col sm={3}>
                    <Input
                        type="text"
                        name="parts_return_listing"
                        id="parts_return_listing"
                        size="sm"
                        placeholder="10/24/2021 01:14:04 AM"
                        disabled={isViewable}
                    />
                </Col>
                <Label for="date" sm={1}>Credit Note<span className="text-danger">*</span></Label>
                <Col sm={3}>
                    <Input
                            type="date"
                            name="parts_return_listing"
                            id="parts_return_listing"
                            size="sm"
                            placeholder=""
                            disabled={isViewable}
                        />
                        <ErrorMessage component={FormFeedback} name="Date" />
                </Col>
               
            </FormGroup>
            <FormGroup row>
                <Label for="supplier" sm={1}>Supplier</Label>
                <Col sm={3}>
                    <Select options={warehouseMockData} styles={reactSelectStyles} />
                    {isViewable && <Button className="btn btn-dark mt-2 btn-sm" onClick={toggleSupplierHandler} disabled={isViewable}><i className="fa fa-plus"></i> Create Supplier</Button>}
                    <Button color="dark" 
                            size="sm" 
                            type="button"
                            className="mt-2" 
                            disabled={isViewable}
                            onClick={toggleSupplierHandler}>
                        <i className="fa fa-plus"></i> Create
                    </Button>
                </Col>
                <Label for="due_date" sm={1}>Credit Note Due Date<span className="text-danger">*</span></Label>
                <Col sm={3}>
                        <Input
                            type="date"
                            name="due_date"
                            id="due_date"
                            size="sm"
                            placeholder=""
                            disabled={isViewable}
                        />
                        <ErrorMessage component={FormFeedback} name="Due Data" />
                </Col>
                <Label for="reference" sm={1}>Reference </Label>
                <Col sm={3}>
                    <Input size="sm" name="reference" disabled={isViewable} onChange={handleChange} onBlur={handleBlur} placeholder="reference" />
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


export const PartsReturnForm = withFormik({
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
