import React, {useState} from 'react'
import {
    Label,
    FormGroup,
    Input,
    FormFeedback,
    ModalBody,
    Modal,
    Row, 
    Col,
    ModalFooter,
    ModalHeader, 
    Button,
} from 'reactstrap';
import InputMask from 'react-input-mask';
import { Field, ErrorMessage, withFormik, Form } from 'formik';
import { useUIContext } from "app/pages/salesorder/context/UIContext";
import * as Yup from "yup";
import { FormSwitch } from 'app/pages/utils/FormSwitch';
import Select from 'react-select'

const InnerForm = ({
    errors,
    touched,
    handleSubmit,
    toggle,
    setFieldValue,
    handleChange,
    handleBlur,
    values,
}) => {
    const UIContext = useUIContext();
    const { warehouseMockData} = UIContext;

    return (
        <Modal isOpen={UIContext.showSupplierModal} toggle={UIContext.toggleSupplierHandler} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                Create Sales Order
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col className="col-lg-6">
                            <FormGroup>
                                <Label for="code">Code <span className="text-danger">*</span></Label>
                                <Input size="sm" tag={Field} name="code" id="code" placeholder="code" className={touched && touched.code ? (errors && errors.code ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="code" />
                            </FormGroup>
                        </Col>

                        <Col className="col-lg-3">
                            <FormGroup>
                                <Label for="phone">Phone<span className="text-danger">*</span></Label>
                                <InputMask
                                    mask="+1 (999)-999-9999"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                >
                                    {() => (
                                        <Input size="sm" tag={Field} name="phone" id="phone" placeholder="phone" className={touched && touched.phone ? (errors && errors.phone ? 'is-invalid' : 'is-valid') : ''} />
                                    )}
                                </InputMask>
                                <ErrorMessage component={FormFeedback} name="phone" />
                            </FormGroup>
                        </Col>
                    
                        <Col>
                            <FormGroup>
                                <Label for="active">Active</Label>
                                <FormSwitch setFieldValue={setFieldValue} name="active"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6">
                            <FormGroup>
                                <Label for="name">Name <span className="text-danger">*</span></Label>
                                <Input size="sm" tag={Field} name="name" id="name" placeholder="name" className={touched && touched.name ? (errors && errors.name ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="name" />
                            </FormGroup>
                        </Col>
                        <Col className="col-lg-6">
                            <FormGroup>
                                <Label for="phone_2">Phone 2</Label>
                                <InputMask
                                    mask="+1 (999)-999-9999"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone_2}
                                >
                                    {() => (
                                        <Input size="sm" tag={Field} name="phone_2" id="phone_2" placeholder="phone_2" className={touched && touched.phone_2 ? (errors && errors.phone_2 ? 'is-invalid' : 'is-valid') : ''} />
                                    )}
                                </InputMask>
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="address">Address<span className="text-danger">*</span></Label>
                                <Input size="sm" tag={Field} name="address" id="address" placeholder="address" className={touched && touched.address ? (errors && errors.address ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="address" />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="postal_zip_code">Postal/ Zip Code </Label>
                                <Input size="sm" tag={Field} name="postal_zip_code" id="postal_zip_code" placeholder="postal_zip_code" className={touched && touched.postal_zip_code ? (errors && errors.postal_zip_code ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="address_2">Address 2</Label>
                                <Input size="sm" tag={Field} name="address_2" id="address_2" placeholder="address_2" className={touched && touched.address_2 ? (errors && errors.address_2 ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="city">City/ Town <span className="text-danger">*</span></Label>
                                <Input size="sm" tag={Field} name="city" id="city" placeholder="city" className={touched && touched.city ? (errors && errors.city ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="city" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="fax_num">Fax</Label>
                                <InputMask
                                    mask="+1 (999)-999-9999"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fax_num}
                                >
                                    {() => (
                                        <Input size="sm" tag={Field} name="fax_num" id="fax_num" placeholder="fax_num" className={touched && touched.fax_num ? (errors && errors.fax_num ? 'is-invalid' : 'is-valid') : ''} />
                                    )}
                                </InputMask>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                    <Label for="state">Province/ State <span className="text-danger">*</span></Label>
                                    <Select options={warehouseMockData} isDisabled="true" /> 
                                    <ErrorMessage component={FormFeedback} name="state" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input size="sm" tag={Field} name="email" id="email" placeholder="email" className={touched && touched.email ? (errors && errors.email ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input size="sm" tag={Field} name="country" id="country" placeholder="country" className={touched && touched.country ? (errors && errors.country ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="payment">Payment Term</Label>
                                <Select options={warehouseMockData}  />                                
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="approval_date">Approval Date</Label>
                                <Input size="sm" tag={Field} name="approval_date" id="approval_date" placeholder="approval_date" className={touched && touched.approval_date ? (errors && errors.approval_date ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="credits_limits">Credit Limits</Label>
                                <Input size="sm" tag={Field} name="credits_limits" id="credits_limits" placeholder="credits_limits" className={touched && touched.credits_limits ? (errors && errors.credits_limits ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="customer_group">Customer Group </Label>
                                <Select options={warehouseMockData}  /> 
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
                        <Col>
                            <FormGroup>
                                <Label for="purchase_group">Purchase Group </Label>
                                <Select options={warehouseMockData}  /> 
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={UIContext.toggleSupplierHandler}>Cancel</Button>
                    <Button color="primary">Save changes</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}


export const SupplierForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ temporaryData, locCoordinates, pickCoordinates }) => {
        return {
            code: temporaryData && temporaryData.code,
            name: temporaryData && temporaryData.name,
            address: temporaryData && temporaryData.address,
            phone: temporaryData && temporaryData.phone,
            city: temporaryData && temporaryData.city,
            state: temporaryData && temporaryData.state,

        }
    },
    validationSchema: Yup.object().shape({
        code: Yup.string().required("Code is required"),
        description: Yup.string().required("Description is required"),
        address: Yup.string().required("Address 1 is required"),
        phone: Yup.string().required("Phone is required"),
        city: Yup.string().required("City is required"),
    }),
    handleSubmit: (values, { props: { submitHandler }, setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        // submitHandler({payload: values, closeModal, setSubmitting, resetForm});
    },
})(InnerForm);