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
import { useUIContext } from "../../context/UIContext";
import * as Yup from "yup";
import { FormSwitch } from 'app/pages/utils/FormSwitch';

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
    return (
        <Modal isOpen={UIContext.showSupplierModal} toggle={UIContext.toggleSupplierHandler} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                Create Supplier
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
                        
                        <Col>
                            <FormGroup>
                                <Label for="preferred_vendor">Preferred Vendor</Label>
                                <FormSwitch setFieldValue={setFieldValue} name="preferred_vendor"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="supplier">Supplier</Label>
                                <FormSwitch setFieldValue={setFieldValue} name="supplier"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-lg-6">
                            <FormGroup>
                                <Label for="description">Description <span className="text-danger">*</span></Label>
                                <Input size="sm" tag={Field} name="description" id="description" placeholder="description" className={touched && touched.description ? (errors && errors.description ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="description" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="active">Active</Label>
                                <FormSwitch setFieldValue={setFieldValue} name="active"/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="vendor">Vendor</Label>
                                <FormSwitch setFieldValue={setFieldValue} name="vendor"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="address_1">Address 1 <span className="text-danger">*</span></Label>
                                <Input size="sm" tag={Field} name="address_1" id="address_1" placeholder="address_1" className={touched && touched.address_1 ? (errors && errors.address_1 ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="address_1" />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="pay_term">Pay Term (days) </Label>
                                <Input size="sm" tag={Field} name="pay_term" id="pay_term" placeholder="pay_term" className={touched && touched.pay_term ? (errors && errors.pay_term ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="pay_term" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="address_2">Address 2</Label>
                                <Input size="sm" tag={Field} name="address_2" id="address_2" placeholder="address_2" className={touched && touched.address_2 ? (errors && errors.address_2 ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="address_2" />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="phone">Phone <span className="text-danger">*</span></Label>
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
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="zipcode">Zipcode</Label>
                                <Input size="sm" tag={Field} name="zipcode" id="zipcode" placeholder="zipcode" className={touched && touched.zipcode ? (errors && errors.zipcode ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="zipcode" />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="phone_2">Phone 2 </Label>
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
                                <ErrorMessage component={FormFeedback} name="phone_2" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="city">City</Label>
                                <Input size="sm" tag={Field} name="city" id="city" placeholder="city" className={touched && touched.city ? (errors && errors.city ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="city" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="fax">Fax</Label>
                                <Input size="sm" tag={Field} name="fax" id="fax" placeholder="fax" className={touched && touched.fax ? (errors && errors.fax ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="fax" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="state">State/Province</Label>
                                <Input size="sm" tag={Field} name="state" id="state" placeholder="state" className={touched && touched.state ? (errors && errors.state ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="state" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="latitude">Latitude</Label>
                                <Input size="sm" tag={Field} name="latitude" id="latitude" placeholder="latitude" className={touched && touched.latitude ? (errors && errors.latitude ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="latitude" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input size="sm" tag={Field} name="country" id="country" placeholder="country" className={touched && touched.country ? (errors && errors.country ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="country" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="longitude">Longitude </Label>
                                <Input size="sm" tag={Field} name="longitude" id="longitude" placeholder="longitude" className={touched && touched.longitude ? (errors && errors.longitude ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="longitude" />
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
            description: temporaryData && temporaryData.description,
            address_1: temporaryData && temporaryData.address_1,
            phone: temporaryData && temporaryData.phone,
            city: temporaryData && temporaryData.city,
        }
    },
    validationSchema: Yup.object().shape({
        code: Yup.string().required("Code is required"),
        description: Yup.string().required("Description is required"),
        address_1: Yup.string().required("Address 1 is required"),
        phone: Yup.string().required("Phone is required"),
        city: Yup.string().required("City is required"),
    }),
    handleSubmit: (values, { props: { submitHandler }, setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        // submitHandler({payload: values, closeModal, setSubmitting, resetForm});
    },
})(InnerForm);