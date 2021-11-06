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
import { useUIContext } from "../../context/UIContext";
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
    const {toggleSupplierHandler, warehouseMockData, prefferedSupplier} = UIContext;
    const [date, setDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const setPoDate = (value) => {
        const formattedDate = dateFormat(value, "yyyy-mm-dd");
        setDate(formattedDate)
        setFieldValue("po_date", formattedDate);
    };


    const [receivingDate, setRecDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const setRecDateHandler = (value) => {
        const formattedDate = dateFormat(value, "yyyy-mm-dd");
        setRecDate(formattedDate)
        setFieldValue("receiving_date", formattedDate);
    };


    const [invDate, setInvDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const setInvDateHandler = (value) => {
        const formattedDate = dateFormat(value, "yyyy-mm-dd");
        setInvDate(formattedDate)
        setFieldValue("invoice_date", formattedDate);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label for="Receiving_number" sm={1}>Receiving #</Label>
                <Col sm={3}>
                    <Input 
                        size="sm" 
                        tag={Field} 
                        name="receiving_number" 
                        id="receiving_number" 
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
                        tag={Field} 
                        name="receiving_date"
                        placeholder="Receiving Date"
                        disabled={isViewable}
                        value={values?.receiving_date ? dateFormat( values?.receiving_date, "yyyy-mm-dd") : receivingDate}
                        onChange={(e) => setRecDateHandler(e.target.value)}
                    />  
                </Col>
                <Label for="supplier" sm={1}>Supplier</Label>
                <Col sm={3}>
                    <Input type="select" name="supplier" size="sm" onChange={handleChange}>
                        <option value="">Please select supplier</option>
                        {prefferedSupplier?.map(({VEN_ID, SUPPLIER}) => 
                            <option value={VEN_ID} selected={values?.supplier === VEN_ID ? true : false}>{SUPPLIER}</option>
                        )}
                    </Input>
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
                    <Input 
                        size="sm" 
                        type="date" 
                        disabled={isViewable} 
                        tag={Field} 
                        name="po_date" 
                        value={values?.po_date ? dateFormat( values?.po_date, "yyyy-mm-dd") : date}
                        onChange={(e) => setPoDate(e.target.value)}
                        id="po_date" 
                    />
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
                    <Input 
                        size="sm" 
                        type="number" 
                        tag={Field} 
                        disabled={isViewable} 
                        name="invoice_no" 
                        placeholder="invoice_no" 
                    />
                </Col>
                <Label for="invoice_date" sm={1}>Invoice Date</Label>
                <Col sm={1}>
                    <Input 
                        size="sm" 
                        type="date" 
                        disabled={isViewable} 
                        tag={Field} 
                        name="invoice_date" 
                        placeholder="invoice_date" 
                        value={values?.invoice_date ? dateFormat( values?.invoice_date, "yyyy-mm-dd") : invDate}
                        onChange={(e) => setInvDateHandler(e.target.value)}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="inventory" sm="1">Inventory</Label>
                <Col sm="3">
                    <Input type="select" name="inventory" size="sm" onChange={handleChange}>
                        <option value="">Please select supplier</option>
                        {warehouseMockData?.map(({WAR_ID, WAREHOUSE}) => <option value={WAR_ID} selected={values?.warehouse === WAR_ID ? true : false}>{WAREHOUSE}</option>)}
                    </Input>
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
                    <Input type="hidden" name="recID" />
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
    mapPropsToValues: ({ context }) => {
        const {tempData} = context;
        return {
            recId: tempData && tempData?.INVREC_ID,
            receiving_number: tempData && tempData?.RECEIVING_NUMBER,
            receiving_date: tempData && tempData?.REC_DATE,
            supplier : tempData && tempData?.VEN_ID,
            po_number: tempData && tempData?.PO_NUMBER,
            inventory: tempData && tempData?.WAR_ID,
            notes: tempData && tempData?.NOTES,
            reference: tempData && tempData?.REFERENCE_NUMBER,
            phone: tempData && tempData?.PHONE,
            bin: tempData && tempData?.BIN,
            shelf: tempData && tempData?.SHELF,
            rack: tempData && tempData?.RACK,
            invoice_date: tempData && tempData?.SUPPLIER_INVOICE_DATE,
            invoice_no: tempData && tempData?.SUPPLIER_INVOICE_NUMBER
            
        } 
    },
    handleSubmit: (values, { props: { context }, setSubmitting, resetForm }) => {
        const {submitFormHandler} = context;
        setSubmitting(true);
        submitFormHandler({payload: values, setSubmitting, resetForm});
    },
})(InnerForm);