import React, { useState } from 'react'
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
    const {
        toggleSupplierHandler, 
        editMode,
        prefferedSupplier, 
        toggleVoidHandler,
        voidModal,
        isEdit,
        setSelectedSupplierHandler,
        selectedSupplier,
        currentDateTime,
        userData,
    } = UIContext;

    return (
        <Form onSubmit={handleSubmit}>
            {isEdit && 
                <Row className="mb-3">
                    <Col className="col-lg-8">
                    </Col>
                    <Col>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                    type="checkbox" 
                                    name="completed" 
                                    disabled={true} 
                                />{' '}
                                Completed
                            </Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                    type="checkbox" 
                                    name="void" 
                                    checked={voidModal}
                                    disabled={isViewable} 
                                    onChange={toggleVoidHandler}
                                />{' '}
                                Void
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
            }
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
                    <Input 
                        size="sm" 
                        disabled={isViewable}
                        tag={Field} 
                        name="phone" 
                        placeholder="phone" 
                        readOnly
                        value={values?.phone ? values?.phone : selectedSupplier?.PHONE_1 ? selectedSupplier?.PHONE_1 : ""}
                    />
                </Col>
                <Label for="prepared_by" sm="1">Prepared By</Label>
                <Col sm="3">
                    <Input type="select" name="prepared_by" disabled={true}>
                        <option value="">Please select prepared by</option>
                        <option value={userData?.USE_ID} selected={true}>{userData?.USERNAME}</option>
                    </Input>
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="po_date" sm={1}>PO Date/Lead Time</Label>
                <Col sm={3}>
                    <Input
                        type="text"
                        name="po_date"
                        id="po_date"
                        size="sm"
                        value={currentDateTime()}
                        placeholder="PO Date"
                        readOnly
                        disabled={isViewable}
                    />
                </Col>
                <Label for="fax" sm={1}>Fax</Label>
                <Col sm={3}>
                    <Input 
                        size="sm" 
                        disabled={isViewable} 
                        tag={Field} 
                        name="fax" 
                        id="fax" 
                        placeholder="fax" 
                        value={selectedSupplier?.FAX ? selectedSupplier?.FAX : ""}
                        readOnly
                    />
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
                    <Input type="select" name="supplier" size="sm" onChange={(e) =>{
                        setFieldValue('supplier', e.target.value);
                        setSelectedSupplierHandler(e.target.value);
                    }}>
                        <option value="">Please select supplier</option>
                        {prefferedSupplier?.map(({VEN_ID, SUPPLIER}) => 
                            <option value={VEN_ID} selected={values?.supplier === VEN_ID}>
                                {SUPPLIER}
                            </option>
                        )}
                    </Input>
                    {isViewable && <Button className="btn btn-dark mt-2 btn-sm" onClick={toggleSupplierHandler} disabled={isViewable}><i className="fa fa-plus"></i> Create Supplier</Button>}
                </Col>
                <Label for="email" sm={1}>Email</Label>
                <Col sm={3}>
                    <Input 
                        size="sm" 
                        tag={Field} 
                        disabled={isViewable} 
                        readOnly 
                        value={selectedSupplier?.EMAIL ? selectedSupplier?.EMAIL : ""} 
                        name="email" 
                        id="email"
                        placeholder="email" 
                    />
                    <ErrorMessage component={FormFeedback} name="email" />
                </Col>
                <Label for="notes" sm={1}>Notes </Label>
                <Col sm={3}>
                    <Input size="sm" name="notes" value={values?.notes} disabled={isViewable} onChange={handleChange} onBlur={handleBlur} placeholder="Notes" />
                </Col>
            </FormGroup>
            {!isViewable && <Row>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Cancel</Button> {' '}
                    <Input type="hidden" name="pOrderId" />
                    {!editMode && <Button color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>}
                    {editMode && <Button color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Editing..." : "Edit"} </Button>}
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
    mapPropsToValues: ({ context }) => {
        const {tempData} = context;
        return {
            pOrderId: tempData && tempData?.PURORD_ID,
            po_number: tempData && tempData?.PO_NUMBER,
            notes: tempData && tempData?.NOTES,
            reference: tempData && tempData?.REFERENCE_NUMBER,
            po_date: tempData && tempData?.PO_DATE,
            phone: tempData && tempData?.PHONE_1,
            fax: tempData && tempData?.FAX,
            email: tempData && tempData?.EMAIL,
            supplier: tempData && tempData?.VEN_ID,
        }
    },
    handleSubmit: (values, { props: { context }, setSubmitting, resetForm }) => {
        const {submitFormHandler} = context;
        setSubmitting(true);
        submitFormHandler({
            payload: values, 
            setSubmitting, 
            resetForm
        });
    },
})(InnerForm);
