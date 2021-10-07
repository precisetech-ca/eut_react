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
}) => {
    const UIContext = useUIContext();
    const {toggleSupplierHandler, warehouseMockData} = UIContext;
    const [value, onChange] = useState(new Date());

    const reactSelectStyles = {
        control: () => ({
            // none of react-select's styles are passed to <Control />
            borderColor: "1px solid #757578",
        }),
    }
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
                            <Input type="checkbox" name="void" />{' '}
                            Void
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup row>
                        <Label for="po_number">PO Number</Label>
                        <Input 
                            size="sm" 
                            tag={Field} 
                            name="po_number" 
                            readOnly={true}
                        />
                        <ErrorMessage component={FormFeedback} name="po_number" />
                    </FormGroup>
                </Col>
                
                <Col>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <InputMask
                            mask="+1 (999)-999-9999"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                        >
                            {() => (
                                <Input 
                                    size="sm" 
                                    tag={Field} 
                                    name="phone" 
                                    placeholder="phone" 
                                />
                            )}
                        </InputMask>
                        
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="prepared_by">Prepared By</Label>
                        <Select options={warehouseMockData} isDisabled="true" />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="po_date">PO Date/Lead Time</Label>
                        <Row>
                            <Col>
                                <DateTimePicker
                                    onChange={(e) => {
                                        onChange(e);
                                        setFieldValue("po_date", dateFormat(e, "isoDateTime"))
                                    }}
                                    value={value}
                                    name="po_date"
                                />
                            </Col>
                        </Row>
                        {/* <Input size="sm" tag={Field} name="po_date" id="po_date" placeholder="po_date" /> */}
                    </FormGroup>
                </Col>
                
                <Col>
                    <FormGroup>
                        <Label for="reference">Reference</Label>
                        <Input size="sm" tag={Field} name="reference" id="reference" placeholder="reference" />
                        <ErrorMessage component={FormFeedback} name="reference" />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="fax">Fax</Label>
                        <InputMask
                            mask="+1 (999)-999-9999"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fax}
                        >
                            {() => (
                                <Input size="sm" tag={Field} name="fax" id="fax" placeholder="fax" />
                            )}
                        </InputMask>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="supplier">Supplier</Label>
                        <Select options={warehouseMockData} styles={reactSelectStyles} />
                        <Button className="btn btn-dark mt-2" onClick={toggleSupplierHandler}>+ Create</Button>
                    </FormGroup>
                </Col>
                
                <Col>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input size="sm" tag={Field} name="email" id="email" placeholder="email" />
                        <ErrorMessage component={FormFeedback} name="email" />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="notes">Notes </Label>
                        <Input type="textarea" name="notes" onChange={handleChange} onBlur={handleBlur} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button type="button" color="danger" onClick={backToHome}>Cancel</Button> {' '}
                    <Button color="primary" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>
                </Col>
            </Row>
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
