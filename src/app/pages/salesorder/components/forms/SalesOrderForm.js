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
import { useUIContext } from "app/pages/salesorder/context/UIContext";
import * as Yup from "yup";
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select'
import InputMask from 'react-input-mask';
import dateFormat from 'dateformat';
import './salesOrderForm.css'

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
            <Row form>
                <Col md={12} sm={12} lg={12} xl={3} id='col1'  >
                    <Label for="order_info" id='col1-heading'>Order Information</Label>
                    <FormGroup row>
                        <Label for="sale_order_num" sm={3}>Sales Order #</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="sale_order_num" 

                            />
                            <ErrorMessage component={FormFeedback} name="sale_order_num" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="date_time" sm={3}>Date/Time </Label>
                        <Col sm={8}>
                            <Input 
                                type="date"
                                size="sm" 
                                tag={Field} 
                                name="date" 

                            />
                        <ErrorMessage component={FormFeedback} name="date_time" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="assinged_to" sm={3}>Assinged To</Label>
                        <Col sm={8}>
                            <Select options={warehouseMockData}  disabled={isViewable} />
                            <ErrorMessage component={FormFeedback} name="assinged_to" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="channel" sm={3}>Channel</Label>
                        <Col sm={8}>
                            <Select options={warehouseMockData}  />
                            <ErrorMessage component={FormFeedback} name="channel" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="ref_num" sm={3}>Ref #</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="ref_num" 
                                
                            />
                            <ErrorMessage component={FormFeedback} name="ref_num" />
                        </Col>
                    </FormGroup>
                </Col>
                <Col md={12} sm={12} lg={12} xl={3} id='col2'  className="offset-lg-1 ml-auto">
                    <Label for="customer_info" id="col2-heading">Customer Information</Label>
                    <FormGroup row>
                        <Label for="customer" sm={3}>Customer</Label>
                        <Col sm={8}>
                            <Select options={warehouseMockData}  /> 
                            <span className="btn btn-dark mt-2 btn-sm" onClick={toggleSupplierHandler}>+ Create</span>
                            <ErrorMessage component={FormFeedback} name="customer" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="name" sm={3}>Name</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="name" 
                                readOnly={true}
                                disabled={isViewable}
                            />
                            <ErrorMessage component={FormFeedback} name="name" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="email" sm={3}>Email</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="email" 
                                readOnly={true}
                                disabled={isViewable}
                            />
                            <ErrorMessage component={FormFeedback} name="email" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="group" sm={3}>Group</Label>
                            <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="group" 
                                readOnly={true}
                                disabled={isViewable}
                            />
                            <ErrorMessage component={FormFeedback} name="group" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="bill_to" sm={3}>Bill to</Label>
                            <Col sm={8}>
                                <Select options={warehouseMockData}  /> 
                                <ErrorMessage component={FormFeedback} name="bill_to" />
                            </Col>
                    </FormGroup>
                </Col>
                <Col md={12} sm={12} lg={12} xl={3} id='col3'  className="offset-lg-1 ml-auto">
                    <Label for="shipping" id="col3-heading">Shipping Information</Label>
                    <FormGroup row>
                        <Label for="address" sm={3}>Address</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="address" 
                               
                            />
                            <ErrorMessage component={FormFeedback} name="address" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="country" sm={3}>Country</Label>
                        <Col sm={8}>
                            <Select options={warehouseMockData}  /> 
                            <ErrorMessage component={FormFeedback} name="country" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="province_state" sm={3}>Province/State</Label>
                        <Col sm={8}>
                            <Select options={warehouseMockData}  />
                            <ErrorMessage component={FormFeedback} name="province_state" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="city" sm={3}>City</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="city" 
                               
                            />
                            <ErrorMessage component={FormFeedback} name="city" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="zip_code" sm={3}>Zip Code</Label>
                            <Col sm={8}>
                                <Input 
                                    size="sm" 
                                    tag={Field} 
                                    name="zip_code" 
                                   
                                />
                                <ErrorMessage component={FormFeedback} name="zip_code" />
                            </Col>
                    </FormGroup>
                </Col>
            </Row>

                <Row form>
                        <Col sm={4} id='col1'>
                                <Label for="dispatch_notes" id='col4-heading'>Dispatch Notes</Label>
                                <FormGroup>
                                    <p>Read only notes available on the mobile Applications.Enter Information such as priority of work , location of the equipmet,etc..</p>
                                </FormGroup>
                        </Col>
                        <Col sm={3} id='col2' className="offset-md-1 ml-auto">
                                <Label for="intertnal_notes" id='col5-heading'>Internal Notes</Label>
                                <FormGroup>
                                    <p>Read only notes available on the mobile Applications.Enter Information such as priority of work , location of the equipmet,etc..</p>
                                </FormGroup>
                        </Col>
                        <Col sm={3} id='col3' className="offset-md-1 ml-auto">
                                <Label for="customer-report" id='col6-heading'>Notes(Shown on customer report)</Label>
                                <FormGroup>
                                    <p>Read only notes available on the mobile Applications.Enter Information such as priority of work , location of the equipmet,etc..</p>
                                </FormGroup>
                        </Col>
                </Row>                
                
            {!isViewable && <Row>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Close</Button> {' '}
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


export const SalesOrderForm = withFormik({
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
