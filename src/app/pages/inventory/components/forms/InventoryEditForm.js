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
} from 'reactstrap';
import FileUpload from 'app/utils/FileUpload';
import { Field, ErrorMessage, withFormik, Form } from 'formik';
import { useIinventoryUIContext } from "app/pages/inventory/context/InventoryUIContext";
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
}) => {
    const { warehouseMockData, prefferedSupplier, weightMockProps, uom, isViewable } = useIinventoryUIContext();
    const [thumbPath, setThumbPath] = useState([]);
    const [filePath, setFilePath] = useState([]);
    return (
      <ModalBody>
        {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )}
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label for="sku" sm={1}>SKU</Label>
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
                
                <Label for="stock_item" sm="2">Stock Item</Label>
                <Col sm="1">
                  <FormSwitch setFieldValue={setFieldValue} name="stock_item" value={values?.stock_item}/>
                </Col>
                <Label for="status" sm="2">Status</Label>
                <Col sm="1">
                  <FormSwitch setFieldValue={setFieldValue} name="status" value={values?.status}/>
                </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="barcode" sm="1">Barcode</Label>
              <Col sm={5}>
                  <Input 
                      size="sm" 
                      tag={Field} 
                      name="barcode" 
                      placeholder="Barcode"
                      disabled={isViewable}
                  />
                  <ErrorMessage component={FormFeedback} name="barcode" />
              </Col>
              <Label for="allow_negative_oh" sm="2">Allow Negative OH</Label>
              <Col sm="1">
                <FormSwitch setFieldValue={setFieldValue} name="allow_negative_oh" value={values?.allow_negative_oh} />
              </Col>
              <Label for="taxable" sm="2">Taxable</Label>
              <Col sm="1">
                <FormSwitch setFieldValue={setFieldValue} name="taxable" value={values?.taxable} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="name" sm="1">Name</Label>
              <Col sm={5}>
                  <Input 
                      size="sm" 
                      tag={Field} 
                      name="name" 
                      placeholder="Name"
                      disabled={isViewable}
                  />
                  <ErrorMessage component={FormFeedback} name="name" />
              </Col>
              <Label for="warehouse" sm="1">Warehouse</Label>
              <Col sm={5}>
                <Input type="select" name="warehouse" size="sm" disabled={isViewable} onChange={(e) => {
                  setFieldValue("warehouse", e.target.value);
                }}>
                  <option>Please Select</option>
                  {warehouseMockData?.map(({WAR_ID, WAREHOUSE}) => 
                    <option 
                      value={WAR_ID} 
                      selected={WAR_ID === values?.warehouse ? true: false}>
                        {WAREHOUSE}
                    </option>)}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="description" sm="1">Description</Label>
              <Col sm={5}>
                  <Input 
                      size="sm" 
                      tag={Field} 
                      name="description" 
                      placeholder="Description"
                      disabled={isViewable}
                  />
                  <ErrorMessage component={FormFeedback} name="description" />
              </Col>
              <Label for="preferred_supply" sm="1">Supplier</Label>
              <Col sm={5}>
                <Input type="select" name="preferred_supply" size="sm" disabled={isViewable} onChange={(e) => {
                  setFieldValue("preferred_supply", e.target.value);
                }}>
                  <option>Please Select</option>
                  {prefferedSupplier?.map(({VEN_ID, SUPPLIER}) => 
                    <option 
                      value={VEN_ID} 
                      selected={VEN_ID === values?.preferred_supply ? true: false}>
                        {SUPPLIER}
                    </option>)}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="dimension" sm="3">Dimension L x H x W (cm)</Label>
              <Col sm={1}>
                  <Input 
                      size="sm" 
                      type="number"
                      tag={Field} 
                      placeholder="L"
                      name="length" 
                      disabled={isViewable}
                  />
              </Col>
              <Col sm={1}>
                  <Input 
                      size="sm" 
                      type="number"
                      placeholder="H"
                      tag={Field} 
                      name="height" 
                      disabled={isViewable}
                  />
              </Col>
              <Col sm={1}>
                  <Input 
                      size="sm" 
                      type="number"
                      placeholder="W"
                      tag={Field} 
                      name="width" 
                      disabled={isViewable}
                  />
              </Col>
              {/* <Col sm={1}></Col> */}
              <Label for="uom" sm="1">UoM</Label>
              <Col sm={5}>
                <Input type="select" name="uom" size="sm" disabled={isViewable} onChange={(e) => {
                  setFieldValue("uom", e.target.value);
                }}>
                  <option>Please Select</option>
                  {uom?.map(({UOM_ID, DESCRIPTION}) => 
                    <option 
                      value={UOM_ID} 
                      selected={UOM_ID === values?.uom ? true: false}>
                        {DESCRIPTION}
                    </option>)}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="weight" sm="1">Weight</Label>
              <Col sm={2}>
                <Input 
                  size="sm" 
                  type="number"
                  placeholder="weight"
                  tag={Field} 
                  name="weight" 
                  disabled={isViewable}
                />
              </Col>
              <Col sm={3}>
                <Input type="select" name="uom" size="sm" disabled={isViewable} onChange={(e) => {
                  setFieldValue("uom", e.target.value);
                }}>
                  <option>Please Select</option>
                  {weightMockProps?.map(({value, label}) => 
                    <option 
                      value={value} 
                      selected={value === values?.uom ? true: false}>
                        {label}
                    </option>)}
                </Input>
              </Col>
              <Label for="re_ordering_uom" sm="1">Re-Ordering UoM</Label>
              <Col sm={5}>
                <Input type="select" name="re_ordering_uom" disabled={isViewable} size="sm" onChange={(e) => {
                  setFieldValue("re_ordering_uom", e.target.value);
                }}>
                  <option>Please Select</option>
                  {uom?.map(({UOM_ID, DESCRIPTION}) => 
                    <option 
                      value={UOM_ID} 
                      selected={UOM_ID === values?.re_ordering_uom ? true: false}>
                        {DESCRIPTION}
                    </option>)}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="on_hand_qty" sm="1">On Hand Quantity</Label>
              <Col sm={5}>
                <Input 
                  size="sm" 
                  type="number"
                  tag={Field} 
                  name="on_hand_qty" 
                  placeholder="On Hand Quantity"
                  disabled={isViewable}
                />
              </Col>
              <Label for="conversion_uom" sm="1">Conversion to UoM</Label>
              <Col sm={5}>
                <Input 
                  size="sm" 
                  tag={Field} 
                  type="number"
                  name="conversion_uom" 
                  placeholder="Conversion to UoM"
                  disabled={isViewable}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="qty_avl" sm="1">Quantity Available</Label>
              <Col sm={5}>
                <Input 
                  size="sm" 
                  tag={Field} 
                  name="qty_avl"
                  placeholder="Quantity Available" 
                  type="number"
                  disabled={isViewable}
                />
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
                <Label for="cost" sm={1}>Cost</Label>
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
            </FormGroup>
            <FormGroup row>
                <Label for="price" sm={1}>Price</Label>
                <Col sm={5}>
                    <Input
                      name="price"
                      size="sm"
                      tag={Field} 
                      type="number"
                      placeholder="Price"
                      className={touched && touched.price ? (errors && errors.price ? 'is-invalid' : 'is-valid') : ''}
                      disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="price" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="average_cost" sm={1}>Average Cost</Label>
                <Col sm={5}>
                    <Input
                      name="average_cost"
                      tag={Field} 
                      id="average_cost"
                      size="sm"
                      type="number"
                      placeholder="Average Cost"
                      disabled={isViewable}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="standard_cost" sm={1}>Standard Cost</Label>
                <Col sm={5}>
                    <Input
                      tag={Field} 
                      name="standard_cost"
                      id="standard_cost"
                      size="sm"
                      type="number"
                      placeholder="Standard Cost"
                      disabled={isViewable}
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
                    <Button type="button" size="sm" color="danger" onClick={onHide}>Cancel</Button> {' '}
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
    );
}


export const InventoryEditForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ tempData, context }) => {
      const {prefferedSupplier, defaultValuePicker, warehouseMockData, uom} = context;
      return ({
        par_id: tempData && tempData.PAR_ID, 
        allow_negative_oh: tempData && tempData.ALLOW_NEGATIVE_FLAG === 'Y' ? true : false, 
        taxable: tempData && tempData.ALLOW_TAX_FLAG === 'Y' ? true : false, 
        stock_item: tempData && tempData.STOCK_ITEM_FLAG === 'Y' ? true : false, 
        status: tempData && tempData.ACTIVE_FLAG === 'Y' ? true : false, 
        sku: tempData && tempData.SKU, 
        price: tempData && tempData.UOM_ID,
        cost: tempData && tempData.UOM_ID_REORDERING,
        standard_cost:  tempData && tempData.STANDARD_COST,
        notes:  tempData && tempData.NOTES,
        barcode:  tempData && tempData.BARCODE_NUMBER,
        description:  tempData && tempData.VEN_DESCRIPTION,
        name:  tempData && tempData.PAR_CODE,
        conversion_uom:  tempData && tempData.CONVERSION_INTO_STOCKING_UOM,
        preferred_supply:  prefferedSupplier && tempData?.VEN_ID,
        warehouse:  warehouseMockData && tempData?.PARWAR_ID,
        uom:  uom && tempData?.UOM,
        re_ordering_uom:  uom && tempData?.UOM_ID_REORDERING,
        average_cost:  tempData && tempData.AVERAGE_COST,
        height:  tempData && tempData.DimensionH,
        length:  tempData && tempData.DimensionL,
        weight:  tempData && tempData.DimensionW,
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