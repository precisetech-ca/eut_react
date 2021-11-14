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
import { usePurchaseGroupUIContext } from "app/pages/purchasegroup/context/PurchaseGroupUIContext";
import * as Yup from "yup";
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select'
import InputMask from 'react-input-mask';
import dateFormat from 'dateformat';
import { FormSwitch } from 'app/pages/utils/FormSwitch';


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
    const PurchaseGroupUIContext = usePurchaseGroupUIContext();
    const {toggleSupplierHandler,  prefferedSupplier } = PurchaseGroupUIContext;
    
    useEffect(() => {
        setFieldValue("po_date", dateFormat(new Date(), "isoDateTime"));
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
      
            <FormGroup row>
                <Label for="code" sm={1}>Code <span className="text-danger">*</span></Label>
                <Col sm={3}>
                    <Input 
                        size="sm" 
                        tag={Field} 
                        name="code" 
                        placeholder="N24"
                        disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="code" />
                </Col>
                <Label for="stock_item" sm="2">Active</Label>
                <Col sm="2">
                <FormSwitch  setFieldValue={setFieldValue} name="active" />
                </Col>
                <Label for="description" sm="1">Description </Label>
                <Col sm={3}>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            size="sm"
                            placeholder="N24 24-35 Months"
                            disabled={isViewable}
                        />
                </Col>
                
            </FormGroup>
            
            <FormGroup row>
            <Label for="color_code" sm="1">Color Code</Label>
                <Col sm="3">
                    <Input
                            type="color"
                            name="color_code"
                            id="color_code"
                            size="sm"
                            placeholder="Color Picker"
                            disabled={isViewable}
                        />
                </Col>
                <Label for="life_cycle" sm={1}>Life Cycle</Label>
                <Col sm={3}>
                    <Input
                        type="text"
                        name="life_cycle"
                        id="life_cycle"
                        size="sm"
                        placeholder="19- 24 Months life"
                        disabled={isViewable}
                    />
                </Col>
                
               
            </FormGroup>
            <FormGroup row>
            <Label for="min_max" sm={1}>Min / Max</Label>
                <Col sm={3}>
                    <Input
                            type="text"
                            name="min_max"
                            id="min_max"
                            size="sm"
                            placeholder="100 / 1000"
                            disabled={isViewable}
                        />
                </Col>
            </FormGroup>
            {!isViewable && <Row>
                <Col className="text-right">
                    <Input type="hidden" name="salesorder_ID" />
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


export const PurchaseGroupForm = withFormik({
    enableReinitialize: true,
      mapPropsToValues: ({ temporaryData }) => {
        return {
            code: temporaryData && temporaryData.code,
            description: temporaryData && temporaryData.description,
            color_code: temporaryData && temporaryData.color_code,
            life_cycle: temporaryData && temporaryData.life_cycle,
            min_max: temporaryData && temporaryData.min_max,
            
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
