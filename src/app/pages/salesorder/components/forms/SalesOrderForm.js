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
import dateFormat from 'dateformat';
import './salesOrderForm.css'

const InnerForm = ({
    isSubmitting,
    handleSubmit,
    setFieldValue,
    values,
    backToHome,
    isViewable,

}) => {
    const UIContext = useUIContext();
    const {  billTo , country , channelsData , provinceSates , customerGroup,} = UIContext;

    useEffect(() => {
        setFieldValue("po_date", dateFormat(new Date(), "isoDateTime"));
    }, [])

    const [date, setDate] = useState(dateFormat(new Date(), "yyyy-mm-dd"));
    const setSalesOrderDate = (value) => {
        const formattedDate = dateFormat(value, "yyyy-mm-dd");
        setDate(formattedDate)
        setFieldValue("setSalesOrderDate", formattedDate);
    };

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
                                readOnly={true}
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
                                value={values?.setSalesOrderDate ? dateFormat( values?.setSalesOrderDate, "yyyy-mm-dd") : date}
                                onChange={(e) => setSalesOrderDate(e.target.value)}

                            />
                        <ErrorMessage component={FormFeedback} name="date_time" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="assinged_to" sm={3}>Assigned To</Label>
                        <Col sm={8}>
                                <Input type="select" name="assinged_to" size="sm" onChange={(e) =>{
                                    setFieldValue('assinged_to', e.target.value);
                                }}>
                                    <option value="">Please select Assinged To</option>
                                    {billTo?.map(({CUSGRO_ID, NAME}) => <option value={CUSGRO_ID} selected={values?.NAME === CUSGRO_ID}>{NAME}</option>)}
                                </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="channel" sm={3}>Channel</Label>
                        <Col sm={8}>
                                <Input type="select" name="channel" size="sm" onChange={(e) =>{
                                    setFieldValue('channel', e.target.value);
                                }}>
                                    <option value="">Please select Channel</option>
                                    {channelsData?.map(({CHANNEL_ID, CODE}) => <option value={CHANNEL_ID} selected={values?.CODE === CHANNEL_ID}>{CODE}</option>)}
                                </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="ref_num" sm={3}>Ref #</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="ref_num" 
                                type="number"
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
                                <Input type="select" name="customer" size="sm" onChange={(e) =>{
                                    setFieldValue('customer', e.target.value);
                                }}>
                                    <option value="">Please select Customer</option>
                                    {customerGroup?.map(({CUSGRO_ID, NAME}) => <option value={CUSGRO_ID} selected={values?.customer === CUSGRO_ID}>{NAME}</option>)}
                                </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="name" sm={3}>Name</Label>
                        <Col sm={8}>
                            <Input 
                                size="sm" 
                                tag={Field} 
                                name="name" 
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
                                disabled={isViewable}
                            />
                            <ErrorMessage component={FormFeedback} name="group" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="bill_to" sm={3}>Bill to</Label>
                            <Col sm={8}>
                                <Input type="select" name="bill_to" size="sm" onChange={(e) =>{
                                    setFieldValue('bill_to', e.target.value);
                                }}>
                                    <option value="">Please select Bill To</option>
                                    {billTo?.map(({CUSGRO_ID, NAME}) => <option value={CUSGRO_ID} selected={values?.NAME === CUSGRO_ID}>{NAME}</option>)}
                                </Input>
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
                                <Input type="select" name="country" size="sm" onChange={(e) =>{
                                    setFieldValue('country', e.target.value);
                                }}>
                                    <option value="">Please select country</option>
                                    {country?.map(({COU_ID, COUNTRY_NAME}) => <option value={COU_ID} selected={values?.COUNTRY_NAME === COU_ID}>{COUNTRY_NAME}</option>)}
                                </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="province_state" sm={3}>Province/State</Label>
                        <Col sm={8}>
                                <Input type="select" name="state" size="sm" onChange={(e) =>{
                                    setFieldValue('state', e.target.value);
                                }}>
                                    <option value="">Please select State</option>
                                    {provinceSates?.map(({PROSTA_ID, PROVIENCE_NAME}) => <option value={PROSTA_ID} selected={values?.state === PROSTA_ID}>{PROVIENCE_NAME}</option>)}
                                </Input>
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
                    <Input type="hidden" name="salesorder_ID" />
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
    mapPropsToValues: ({ context }) => {
        const {tempData} = context;
        console.log(tempData);
        return {
            salesorder_ID : tempData && tempData?.SALEORD_ID,
            sale_order_num: tempData && tempData?.SALEORD_NUMBER,
            date :          tempData && tempData?.SALEORD_DATE,
            address :       tempData && tempData?.ADDRESS,
            city :          tempData && tempData?.CITY_NAME,
            zip_code:       tempData && tempData?.ZIP_CODE,
            customer: tempData && tempData?.CUS_ID

        }
    },
    handleSubmit: (values, { props: { context }, setSubmitting, resetForm }) => {
        const {submitFormHandler} = context;
        setSubmitting(true);
        submitFormHandler({payload: values, setSubmitting, resetForm});
    },
})(InnerForm);
