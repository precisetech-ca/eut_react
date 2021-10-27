import React, {useEffect, useState} from 'react'
import {
  Label,
  FormGroup,
  FormFeedback,
  Row, 
  Input,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import FileUpload from 'app/utils/FileUpload';
import { Field, ErrorMessage, withFormik, Form } from 'formik';
import { usePhysicalCountUIContext } from "app/pages/physicalcount/context/PhysicalCountUIContext";
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
    values,
    actionsLoading,
    errors,
    touched,
    onHide,
    toggle
}) => {
    const PhysicalCountUIContext = usePhysicalCountUIContext();
    // const {toggleNewPartHandler} = PartsReturnUIContext;
    const {  prefferedSupplier, weightMockProps, isViewable } = PhysicalCountUIContext;
    const [value, onChange] = useState(new Date());
    const [thumbPath, setThumbPath] = useState([]);
    const [filePath, setFilePath] = useState([]);
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
    <Modal isOpen={PhysicalCountUIContext.showNewPartModal} toggle={PhysicalCountUIContext.toggleNewPartHandler} size="xl" centered>
      <ModalHeader toggle={toggle}>Add Part</ModalHeader>
      <ModalBody >
        {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )}
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label for="sku" sm={1}>SKU<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Input 
                      size="sm" 
                      tag={Field} 
                      name="sku" 
                      type="number"
                      placeholder="SKU"
                      disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="sku" />
                </Col>
                
                <Label for="stock_item" sm="2">Manage Stock</Label>
                <Col sm="1">
                  <FormSwitch setFieldValue={setFieldValue} name="stock_item"/>
                </Col>
                <Label for="status" sm="2">Active</Label>
                <Col sm="1">
                  <FormSwitch setFieldValue={setFieldValue} name="status"/>
                </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm="1">Name<span className="text-danger">*</span></Label>
              <Col sm={5}>
                  <Input 
                      size="sm" 
                      tag={Field} 
                      name="name" 
                      placeholder="name"
                      disabled={isViewable}
                  />
                  <ErrorMessage component={FormFeedback} name="name" />
              </Col>
              <Label for="show_supply" sm="2">Show Supply</Label>
              <Col sm="1">
                <FormSwitch setFieldValue={setFieldValue} name="show_supply" value={values?.show_supply} />
              </Col>
              <Label for="allow_fra_qty" sm="2">Allow Fraction Qty</Label>
              <Col sm="1">
                <FormSwitch setFieldValue={setFieldValue} name="allow_fra_qty" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="warehouse" sm="1">Warehouse</Label>
              <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="warehouse" />
              </Col>
                <Label for="allow_neg_on_off" sm="2">Allow Negative ON OFF</Label>
                <Col sm="1">
                    <FormSwitch setFieldValue={setFieldValue} name="allow_neg_on_off" value={values?.allow_neg_on_off} />
                </Col>
                <Label for="allow_neg" sm="2">Allow Negative Oh Other</Label>
                <Col sm="1">
                    <FormSwitch setFieldValue={setFieldValue} name="allow_neg" />
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="uom" sm="1">UOM<span className="text-danger">*</span></Label>
              <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="uom" />
              </Col>
              <Label for="gl_acc_cost" sm="1">GL Account Cost</Label>
              <Col sm={5}>
                <Select 
                  getOptionLabel={option => option.SUPPLIER}
                  getOptionValue={option => option.VEN_ID} 
                  options={prefferedSupplier} 
                  // value={prefferedSupplier?.filter(function(option) {
                  //   return option.VEN_ID === 78619;
                  // })}
                  defaultValue={values?.preferred_supply}
                  styles={reactSelectStyles}
                  onChange={(e) => {
                  setFieldValue("preffered_supplier", e.VEN_ID);
                }}/>
              </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="rerender_uom" sm="1">Rerendering UOM<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="rerender_uom" />
                </Col>
              {/* <Col sm={1}></Col> */}
              <Label for="price" sm="1">Price</Label>
              <Col sm={5}>
                <Input 
                        size="sm" 
                        tag={Field} 
                        name="price" 
                        placeholder="price"
                        disabled={isViewable}
                    />
              </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="unit_conversion" sm="1">Unit Conversion<span className="text-danger">*</span></Label>
                <Col sm={5}>
                        <Input 
                        size="sm" 
                        type="number"
                        tag={Field} 
                        name="unit_conversion" 
                        placeholder="Unit Conversion"
                        disabled={isViewable}
                        />
                </Col>
              <Label for="warranty" sm="1">Warranty</Label>
              <Col sm={5}>
                    <Input
                        type='date' 
                        size="sm" 
                        tag={Field} 
                        name="price" 
                        placeholder="price"
                        disabled={isViewable}
                    />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="stock_qty" sm="1">Stock Quantity</Label>
              <Col sm={5}>
                <Input 
                  size="sm" 
                  type="number"
                  tag={Field} 
                  name="stock_qty" 
                  placeholder="Stock Quantity"
                  disabled={isViewable}
                />
              </Col>
                <Label for="system" sm="1">System<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="system" />
                </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="preffered_supplier" sm="1">Prefered Supplier</Label>
              <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="preffered_supplier" />
              </Col>
                <Label for="assembly" sm="1">Assembly</Label>
                <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="assembly" />
                </Col>
              
            </FormGroup>
            
            <FormGroup row>
                <Label for="cost" sm={1}>Average Cost</Label>
                <Col sm={5}>
                    <Input
                      name="cost"
                      id="cost"
                      tag={Field} 
                      size="sm"
                      type="number"
                      placeholder="Cost"
                      className={touched && touched.cost ? (errors && errors.cost ? 'is-invalid' : 'is-valid') : ''}
                      disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="cost" />
                </Col>
                <Label for="component" sm="1">Component</Label>
                <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="component" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="standard_cost" sm={1}>Standard Cost<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Input
                      name="standard_cost"
                      tag={Field} 
                      id="standard_cost"
                      size="sm"
                      type="number"
                      placeholder="Standard Cost"
                      disabled={isViewable}
                    />
                </Col>
                <Label for="suspended_by" sm="1">Suspended By</Label>
                <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="suspended_by" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="gl_account" sm={1}>GL Account<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Input
                      name="gl_account"
                      tag={Field} 
                      id="gl_account"
                      size="sm"
                      type="number"
                      placeholder="GL Account"
                      disabled={isViewable}
                    />
                </Col>
                <Label for="gl_account_inventory" sm="1">GL Acconts Inventory<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="gl_account_inventory" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="gl_acc_cost" sm={1}>GL Account Cost<span className="text-danger">*</span></Label>
                <Col sm={5}>
                    <Select options={weightMockProps} onChange={(e) => {
                        setFieldValue("weight_symbol", e.value);
                        }}/>
                    <ErrorMessage component={FormFeedback} name="gl_acc_cost" />
                </Col>
                <Label for="qty_avl" sm="1">Images</Label>
                <Col sm={5}>
                <FileUpload
                    name="inventoryFile"
                    isSubmitting={false}
                    filePath={thumbPath ? thumbPath : 'https://via.placeholder.com/1000x200'}
                    endpoint={`${process.env.REACT_APP_API_BASE_URL}/inventory/uploads`}
                    responseCallback={(res) => {
                        setThumbPath(res.data.thumbnails);
                        setFilePath(res.data.filePath);
                    }}
                    setFieldValue={(name, file) => console.log(name, '=>', file)}
                />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="notes" sm={1}>Notes</Label>
                <Col sm={11}>
                    <Input
                      tag={Field} 
                      type="textarea"
                      name="notes"
                      id="notes"
                      size="sm"
                      placeholder="Notes"
                      disabled={isViewable}
                    />
                </Col>
            </FormGroup>
            {!isViewable && <Row>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" onClick={PhysicalCountUIContext.toggleNewPartHandler}>Cancel</Button> {' '}
                    <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>
                </Col>
            </Row>}

            {isViewable && <Row>
                <Col className="text-right">
                    <Input name="par_id" type="hidden" />
                    <Button type="button" size="sm" color="danger" onClick={onHide}>Close</Button> {' '}
                </Col>
            </Row>}
            
        </Form>
      </ModalBody>
      </Modal>
    );
}


export const NewPartForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ tempData, context }) => {
      return ({
        par_id: tempData && tempData.PAR_ID, 
      })
    },
    validationSchema: Yup.object().shape({
      price: Yup.string().required("Price is required"),
      cost: Yup.string().required("Cost is required"),
    }),
    handleSubmit: (values, { props: { submitFormHandler }, setSubmitting, resetForm }) => {
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 1000);

        submitFormHandler({ payload: values, setSubmitting, resetForm });
    },
})(InnerForm);