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
import { useUIContext } from "app/pages/purchase/context/UIContext";
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
            <Row className="mb-3">
                <Col className="col-lg-8">
                </Col>
                <Col>
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
                </Col>
            </Row>
    
            <FormGroup row>
                <Label for="po_number" sm={1}>PO Number</Label>
                <Col sm={3}>
                    <Input 
                        size="sm" 
                        tag={Field} 
                        name="po_number" 
                        readOnly={true}
                        disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="po_number" />
                </Col>
                <Label for="phone" sm="1">Phone</Label>
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
                <Label for="prepared_by" sm="1">Prepared By</Label>
                <Col sm="3">
                    <Select options={warehouseMockData} isDisabled="true" />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="po_date" sm={1}>PO Date/Lead Time</Label>
                <Col sm={3}>
                    <Input
                        type="date"
                        name="po_date"
                        id="po_date"
                        size="sm"
                        placeholder="PO Date"
                        disabled={isViewable}
                    />
                </Col>
                <Label for="fax" sm={1}>Fax</Label>
                <Col sm={3}>
                    <InputMask
                        mask="+1 (999)-999-9999"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fax}
                        disabled={isViewable}
                    >
                        {() => (
                            <Input size="sm" disabled={isViewable} tag={Field} name="fax" id="fax" placeholder="fax" />
                        )}
                    </InputMask>
                </Col>
                <Label for="reference" sm={1}>Reference</Label>
                <Col sm={3}>
                    <Input size="sm" disabled={isViewable} tag={Field} name="reference" id="reference" placeholder="reference" />
                    <ErrorMessage component={FormFeedback} name="reference" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="supplier" sm={1}>Supplier</Label>
                <Col sm={3}>
                    <Select options={warehouseMockData} styles={reactSelectStyles} />
                    {isViewable && <Button className="btn btn-dark mt-2 btn-sm" onClick={toggleSupplierHandler} disabled={isViewable}><i className="fa fa-plus"></i> Create Supplier</Button>}
                    
                </Col>
                <Label for="email" sm={1}>Email</Label>
                <Col sm={3}>
                    <Input size="sm" tag={Field} disabled={isViewable} name="email" id="email" placeholder="email" />
                    <ErrorMessage component={FormFeedback} name="email" />
                </Col>
                <Label for="notes" sm={1}>Notes </Label>
                <Col sm={3}>
                    <Input size="sm" name="notes" disabled={isViewable} onChange={handleChange} onBlur={handleBlur} placeholder="Notes" />
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


export const PurchaseOrderForm = withFormik({
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
