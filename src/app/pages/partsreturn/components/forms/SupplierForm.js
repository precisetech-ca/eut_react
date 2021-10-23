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
import { usePartsReturnUIContext } from "app/pages/partsreturn/context/PartsReturnUIContext";
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
    const PartsReturnUIContext = usePartsReturnUIContext();
    const { warehouseMockData} = PartsReturnUIContext;

    return (
        <Modal isOpen={PartsReturnUIContext.showSupplierModal} toggle={PartsReturnUIContext.toggleSupplierHandler} size="lg" centered>
            <ModalHeader  toggle={toggle}>
                Add Supplier
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
                                <Label for="preffered_vendor">Preferred Vendor</Label>
                                <FormSwitch setFieldValue={setFieldValue} name="preffered_vendor"/>
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
                                <Label for="vendor"> Vendor</Label>
                                <FormSwitch setFieldValue={setFieldValue} name="vendor"/>
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="address_1">Address 1<span className="text-danger">*</span></Label>
                                <Input size="sm" tag={Field} name="address_1" id="address_1" placeholder="address_1" className={touched && touched.address ? (errors && errors.address ? 'is-invalid' : 'is-valid') : ''} />
                                <ErrorMessage component={FormFeedback} name="address_1" />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="pay_term_days">Pay Term (days)</Label>
                                <Input size="sm" tag={Field} name="pay_term_days" id="pay_term_days" placeholder="pay_term_days" className={touched && touched.pay_term_days ? (errors && errors.pay_term_days ? 'is-invalid' : 'is-valid') : ''} />
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
                            <Label for="phone">Phone<span className="text-danger">*</span></Label>
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
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="zip">Zip</Label>
                                <Input size="sm" tag={Field} name="zip" id="zip" placeholder="zip" className={touched && touched.zip ? (errors && errors.zip ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="phone_2">Phone 2</Label>
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
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="city">City</Label>
                                <Input size="sm" tag={Field} name="city" id="city" placeholder="city" className={touched && touched.city ? (errors && errors.city ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="fax">Fax</Label>
                                <Input size="sm" tag={Field} name="fax" id="fax" placeholder="fax" className={touched && touched.fax ? (errors && errors.fax ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="state">Province/ State</Label>
                                <Select options={warehouseMockData}  />                                
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="latitude">Latitude</Label>
                                <Input size="sm" tag={Field} name="latitude" id="latitude" placeholder="latitude" className={touched && touched.latitude ? (errors && errors.latitude ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input size="sm" tag={Field} name="country" id="country" placeholder="country" className={touched && touched.country ? (errors && errors.country ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="longitude">Longitude</Label>
                                <Input size="sm" tag={Field} name="longitude" id="longitude" placeholder="longitude" className={touched && touched.longitude ? (errors && errors.longitude ? 'is-invalid' : 'is-valid') : ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="email">Email </Label>
                                <Input type="text" name="email" placeholder="example@domain.com" onChange={handleChange} onBlur={handleBlur} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="notes">Notes </Label>
                                <Input type="textarea" name="notes" onChange={handleChange} onBlur={handleBlur} />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={PartsReturnUIContext.toggleSupplierHandler}>Cancel</Button>
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