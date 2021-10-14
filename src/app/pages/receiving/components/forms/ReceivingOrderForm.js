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
import { useUIContext } from "app/pages/receiving/context/UIContext";
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
    isViewable
}) => {
    const UIContext = useUIContext();
    const {toggleSupplierHandler, warehouseMockData} = UIContext;
    
    useEffect(() => {
        setFieldValue("po_date", dateFormat(new Date(), "isoDateTime"));
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label for="Receiving_number" sm={1}>Receiving #</Label>
                <Col sm={3}>
                    <Input 
                        size="sm" 
                        tag={Field} 
                        name="Receiving_number" 
                        readOnly={true}
                    />
                    <ErrorMessage component={FormFeedback} name="Receiving_number" />
                </Col>
                <Col sm={8}></Col>
            </FormGroup>
            <FormGroup row>
                <Label for="Receiving_date" sm={1}>Receiving Date</Label>
                <Col sm={3}>
                    <Input
                        type="date"
                        name="receiving_date"
                        placeholder="Receiving Date"
                        disabled={isViewable}
                    />  
                </Col>
                <Label for="supplier" sm={1}>Supplier</Label>
                <Col sm={3}>
                    <Select options={warehouseMockData} isDisabled={isViewable} />
                    <Button color="dark" 
                            size="sm" 
                            type="button"
                            className="mt-2" 
                            disabled={isViewable}
                            onClick={toggleSupplierHandler}>
                        <i className="fa fa-plus"></i> Create
                    </Button>
                </Col>
                <Label for="received_by" sm="1">Received By</Label>
                <Col sm="3">
                    <Select options={warehouseMockData} isDisabled="true" />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                
                
                
            </FormGroup>
            <FormGroup row>
                <Label for="po_number" sm={1}>PO Number</Label>
                <Col sm={1}>
                    <Input size="sm" tag={Field} disabled={isViewable} name="po_number" id="po_number" />
                </Col>
                <Label for="po_date" sm={1}>PO Date</Label>
                <Col sm={1}>
                    <Input size="sm" type="date" disabled={isViewable} tag={Field} name="po_date" id="po_date" />
                </Col>

                <Label for="phone" sm="1">Phone<span className="text-danger">*</span></Label>
                <Col sm={3}>
                    <InputMask
                        mask="+1 (999)-999-9999"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        disabled={isViewable}
                    >
                        {() => (
                            <Input 
                                size="sm" 
                                disabled={isViewable}
                                tag={Field} 
                                name="phone" 
                                placeholder="phone" 
                            />
                        )}
                    </InputMask>
                </Col>
                <Label for="invoice_no" sm={1}>Invoice No</Label>
                <Col sm={1}>
                    <Input size="sm" tag={Field} disabled={isViewable} name="invoice_no" placeholder="invoice_no" />
                </Col>
                <Label for="invoice_date" sm={1}>Invoice Date</Label>
                <Col sm={1}>
                    <Input size="sm" type="date" disabled={isViewable} tag={Field} name="invoice_date" placeholder="invoice_date" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="inventory" sm="1">Inventory</Label>
                <Col sm="3">
                    <Select options={warehouseMockData} isDisabled={isViewable} />
                </Col>
                <Label for="Inv_Due_Date" sm="1">Fax</Label>
                <Col sm={3}>
                    <InputMask
                        mask="+1 (999)-999-9999"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fax}
                        disabled={isViewable}
                    >
                        {() => (
                            <Input 
                                size="sm" 
                                disabled={isViewable}
                                tag={Field} 
                                name="fax" 
                                placeholder="fax" 
                            />
                        )}
                    </InputMask>
                </Col>
                <Label for="reference" sm={1}>Reference </Label>
                <Col sm={3}>
                    <Input size="sm" name="reference" disabled={isViewable} onChange={handleChange} onBlur={handleBlur} placeholder="Reference" />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="Location" sm="1">Location</Label>
                <Col sm="1">
                    <Input size="sm" tag={Field} disabled={isViewable} name="rack" placeholder="rack" />
                </Col>
                <Col sm="1">
                    <Input size="sm" tag={Field} disabled={isViewable} name="shelf" placeholder="shelf" />
                </Col>
                <Col sm="1">
                    <Input size="sm" tag={Field} disabled={isViewable} name="bin" placeholder="bin" />
                </Col>

                <Label for="email" sm="1">Email</Label>
                <Col sm="3">
                    <Input size="sm" tag={Field} disabled={isViewable} name="email" placeholder="email" />
                </Col>

                <Label for="notes" sm="1">Notes</Label>
                <Col sm="3">
                    <Input 
                        size="sm" 
                        tag={Field} 
                        name="notes"
                        placeholder="notes" 
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
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Back</Button> {' '}
                </Col>
            </Row>}
            
        </Form>
    );
}


export const ReceivingOrderForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ temporaryData }) => {
        return {
            notes: temporaryData && temporaryData.notes,
            // phone: temporaryData && temporaryData.phone,
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
