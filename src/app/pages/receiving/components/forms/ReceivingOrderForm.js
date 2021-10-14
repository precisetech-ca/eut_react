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
}) => {
    const UIContext = useUIContext();
    const {toggleSupplierHandler, warehouseMockData} = UIContext;
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
                <Label for="supplier" sm={1}>Supplier</Label>
                <Col sm={3}>
                    <Input size="sm" tag={Field} name="supplier" id="supplier" />
                    <ErrorMessage component={FormFeedback} name="supplier" />
                </Col>
                <Label for="received_by" sm="1">Received By</Label>
                <Col sm="3">
                    <Select options={warehouseMockData} isDisabled="true" />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="Receiving_date" sm={1}>Receiving Date</Label>
                <Col sm={3}>
                    
                </Col>
                <Label for="Inv_Date" sm="1">Inv.Date<span className="text-danger">*</span></Label>
                <Col sm={3}>
                    <DateTimePicker
                        wrapperClassName="datepicker"
                        onChange={(e) => {
                            onChange(e);
                            setFieldValue("Inv_Date", dateFormat(e, "isoDateTime"))
                        }}
                        value={value}
                        name="Inv_Date"
                    />
                </Col>
                <Label for="reference_num" sm={1}>Reference #</Label>
                <Col sm={3}>
                    <Input size="sm" tag={Field} name="reference_num" id="reference_num" placeholder="reference_num" />
                    <ErrorMessage component={FormFeedback} name="reference_num" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="supplier" sm={1}>Supplier</Label>
                <Col sm={3}>
                    <Select options={warehouseMockData} styles={reactSelectStyles} />
                    <span className="btn btn-dark mt-2 btn-sm" onClick={toggleSupplierHandler}>+ Create</span>
                </Col>
                <Label for="Inv_Due_Date" sm="1">Inv.Due Date<span className="text-danger">*</span></Label>
                <Col sm={3}>
                    <DateTimePicker
                        wrapperClassName="datepicker"
                        onChange={(e) => {
                            onChange(e);
                            setFieldValue("Inv_Due_Date", dateFormat(e, "isoDateTime"))
                        }}
                        value={value}
                        name="Inv_Due_Date"
                    />
                </Col>
                <Label for="notes" sm={1}>Notes </Label>
                <Col sm={3}>
                    <Input size="sm" name="notes" onChange={handleChange} onBlur={handleBlur} placeholder="Notes" />
                </Col>
            </FormGroup>
            <Row>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Cancel</Button> {' '}
                    <Button color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>
                </Col>
            </Row>
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
