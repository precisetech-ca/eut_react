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
import { useCustomersUIContext } from "app/pages/inventory/context/InventoryUIContext";
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
    handleChange,
    handleBlur,
    values,
    backToHome,
    isViewable,
    actionsLoading,
    errors,
    touched,
}) => {
    // const UIContext = useCustomersUIContext();
    // const {toggleSupplierHandler, warehouseMockData} = UIContext;
    const { warehouseMockData, prefferedSupplier, weightMockProps } = useCustomersUIContext();
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
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={InventoryEditSchema}
        onSubmit={(values) => {
          saveCustomer(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-6 col-sm-6">
                  {/* <span className="text-danger">*</span> */}
                    <Field
                      name="details"
                      component={Input}
                      placeholder="Details"
                      label="Details"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Last Name */}
                  
                  {/* Login */}
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Manage Stock</FormLabel>
                    <FormSwitch />
                   
                  </div>
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Active</FormLabel>
                    <FormSwitch />
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-6 col-sm-6">
                    <Field
                      name="barcode"
                      component={Input}
                      placeholder="Barcode"
                      label="Barcode #"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Login */}
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Shop Supply</FormLabel>
                    <FormSwitch />
                   
                  </div>
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Allow Fraction Qty</FormLabel>
                    <FormSwitch />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="Sku "
                      component={Input}
                      placeholder="Sku "
                      label="Sku ***"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Allow Negative ON FO</FormLabel>
                    <FormSwitch />
                   
                  </div>
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Allow Negative Oh Other</FormLabel>
                    <FormSwitch />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Type */}
                  <div className="col-lg-6">
                      <FormLabel>Warehouse</FormLabel>
                      <Select options={warehouseMockData} />
                    </div>
                  {/* Type */}
                  <div className="col-lg-6">
                      <FormLabel>GL Account Cost</FormLabel>
                      <Select options={warehouseMockData} />
                    </div>
                  
                </div>

                <div className="form-group row">

                {/* Type */}
                <div className="col-lg-6">
                    <FormLabel>UOM</FormLabel>
                    <Select options={prefferedSupplier} />
                  </div>
                  {/* Gender */}
                  {/* <div className="col-lg-2">
                    <Field
                      name="length_dimensions"
                      component={Input}
                      placeholder="L"
                      label="Dimension (L)"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-lg-2">
                    <Field
                        name="height_dimensions"
                        component={Input}
                        placeholder="H"
                        label="Dimension (H)"
                        className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-lg-2">
                    <Field
                        name="width_dimensions"
                        component={Input}
                        placeholder="W"
                        label="Dimension (W)"
                        className="form-control form-control-sm"
                    />
                  </div> */}
                  <div className="col-lg-6">
                    <Field
                        name="width_dimensions"
                        component={Input}
                        placeholder="Price"
                        label="Price"
                        className="form-control form-control-sm"
                    />
                  </div>
                  
                </div>
                <div className="form-group row">
                    <div className="col-lg-6">
                      <FormLabel>Re-Ordering UOM</FormLabel>
                      <Select options={prefferedSupplier} />
                    </div>
                    <div className="col-lg-6">
                        <FormLabel>Warranty</FormLabel>
                        <DateTimePicker
                            wrapperClassName="datepicker"
                            name="Warranty"
                        />
                    </div>
                </div>
                
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <FormLabel>Unit Conversion</FormLabel>
                      <Field
                        name="unit_conversion"
                        component={Input}
                        placeholder="Unit Conversion"
                        label="Unit Conversion"
                        className="form-control form-control-sm"
                      />
                  </div>
                    <div className="col-lg-6">
                      <FormLabel>System</FormLabel>
                      <Select options={prefferedSupplier} />
                    </div>
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="stock_qty"
                      component={Input}
                      placeholder="Stock Qty"
                      label="Stock Qty"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Type */}
                    <div className="col-lg-6">
                      <FormLabel>Assembly</FormLabel>
                      <Select options={prefferedSupplier} />
                    </div>
                </div>

                <div className="form-group row">
                  {/* Type */}
                  <div className="col-lg-6">
                      <FormLabel>Preffered Supplier</FormLabel>
                      <Select options={prefferedSupplier} />
                    </div>
                  {/* Type */}
                    <div className="col-lg-6">
                        <FormLabel>Component </FormLabel>
                        <Select options={prefferedSupplier} />
                      </div>
                  {/* */}
                </div>

                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="average_cost"
                      component={Input}
                      placeholder="Average Cost"
                      label="Average Cost"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Type */}
                  <div className="col-lg-6">
                        <FormLabel>Suspend By </FormLabel>
                        <Select options={prefferedSupplier} />
                  </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="standard_cost"
                        component={Input}
                        placeholder="Standard Cost"
                        label="Standard Cost"
                        className="form-control form-control-sm"
                      />
                    </div>
                  {/* Type */}
                  <div className="col-lg-6">
                        <FormLabel>GL Account</FormLabel>
                        <Select options={prefferedSupplier} />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Type */}
                  <div className="col-lg-6">
                          <FormLabel>GL Acconts Inventory</FormLabel>
                          <Select options={prefferedSupplier} />
                    </div>
                  {/* Type */}
                  <div className="col-lg-6">
                        <FormLabel>GL Account Cost</FormLabel>
                        <Select options={prefferedSupplier} />
                  </div>
                </div>
                <div className='form-group row'>

                  <div className="col-lg-6">
                        <Field
                          name="notes"
                          component={Input}
                          placeholder="Notes"
                          label="Notes"
                          className="form-control form-control-sm"
                        />
                      </div>
                  
                  <div className="col-lg-6">
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
                    </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
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
                      placeholder="SKU"
                      disabled={isViewable}
                    />
                    <ErrorMessage component={FormFeedback} name="sku" />
                </Col>
                
                <Label for="stock_item" sm="2">Stock Item</Label>
                <Col sm="1">
                  <FormSwitch setFieldValue={setFieldValue} name="stock_item"/>
                </Col>
                <Label for="status" sm="2">Status</Label>
                <Col sm="1">
                  <FormSwitch setFieldValue={setFieldValue} name="status"/>
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
                <FormSwitch setFieldValue={setFieldValue} name="allow_negative_oh" />
              </Col>
              <Label for="taxable" sm="2">Taxable</Label>
              <Col sm="1">
                <FormSwitch setFieldValue={setFieldValue} name="taxable" />
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
                <Select options={warehouseMockData} />
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
              <Label for="preferred_supply" sm="1">Preffered Supply</Label>
              <Col sm={5}>
                <Select options={prefferedSupplier} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="dimension" sm="3">Dimension L x H x W (cm)</Label>
              <Col sm={1}>
                  <Input 
                      size="sm" 
                      tag={Field} 
                      placeholder="L"
                      name="dimension" 
                      disabled={isViewable}
                  />
              </Col>
              <Col sm={1}>
                  <Input 
                      size="sm" 
                      placeholder="H"
                      tag={Field} 
                      name="dimension" 
                      disabled={isViewable}
                  />
              </Col>
              <Col sm={1}>
                  <Input 
                      size="sm" 
                      placeholder="W"
                      tag={Field} 
                      name="dimension" 
                      disabled={isViewable}
                  />
              </Col>
              {/* <Col sm={1}></Col> */}
              <Label for="uom" sm="1">UoM</Label>
              <Col sm={5}>
                <Input 
                  size="sm" 
                  tag={Field} 
                  name="uom" 
                  placeholder="UoM"
                  disabled={isViewable}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="weight" sm="1">Weight</Label>
              <Col sm={5}>
                <Select options={weightMockProps} />
              </Col>
              <Label for="re_ordering_uom" sm="1">Re-Ordering UoM</Label>
              <Col sm={5}>
                <Input 
                  size="sm" 
                  tag={Field} 
                  name="re_ordering_uom" 
                  placeholder="Re-Ordering UoM"
                  disabled={isViewable}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="on_hand_qty" sm="1">On Hand Quantity</Label>
              <Col sm={5}>
                <Input 
                  size="sm" 
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
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Cancel</Button> {' '}
                    <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"} </Button>
                </Col>
            </Row>}

            {isViewable && <Row>
                <Col className="text-right">
                    <Button type="button" size="sm" color="danger" onClick={backToHome}>Close</Button> {' '}
                </Col>
            </Row>}
            
        </Form>
      </ModalBody>
    );
}


export const InventoryEditForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ temporaryData }) => ({
      price: temporaryData && temporaryData.notes,
      cost: temporaryData && temporaryData.phone,
    }),
    validationSchema: Yup.object().shape({
      price: Yup.string().required("Price is required"),
      cost: Yup.string().required("Cost is required"),
    }),
    handleSubmit: (values, { props: { submitHandler }, setSubmitting }) => {
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
        console.log(values);
        // submitHandler({payload: values, closeModal, setSubmitting, resetForm});
    },
})(InnerForm);


// export function InventoryEditForm({
//   saveCustomer,
//   customer,
  
//   onHide,
// }) {
//   const { warehouseMockData, prefferedSupplier, weightMockProps } = useCustomersUIContext();
//   const [thumbPath, setThumbPath] = useState([]);
//   const [filePath, setFilePath] = useState([]);

//   return (
//     <>
//       <Formik
//         enableReinitialize={true}
//         initialValues={customer}
//         validationSchema={InventoryEditSchema}
//         onSubmit={(values) => {
//           saveCustomer(values);
//         }}
//       >
//         {({ handleSubmit }) => (
//           <>
//             <Modal.Body className="overlay overlay-block cursor-default">
             
//               <Form className="form form-label-right">
//                 <div className="form-group row">
//                   {/* First Name */}
//                   <div className="col-lg-6 col-sm-6">
//                     <Field
//                       name="details"
//                       component={Input}
//                       placeholder="Details"
//                       label="SKU"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Last Name */}
                  
//                   {/* Login */}
//                   <div className="col-lg-3 col-sm-3">
//                     <FormLabel>Stock Item</FormLabel>
//                     <FormSwitch />
                   
//                   </div>
//                   <div className="col-lg-3 col-sm-3">
//                     <FormLabel>Status</FormLabel>
//                     <FormSwitch />
//                   </div>
//                 </div>
//                 {/* Email */}
//                 <div className="form-group row">
//                   <div className="col-lg-6 col-sm-6">
//                     <Field
//                       name="barcode"
//                       component={Input}
//                       placeholder="Barcode"
//                       label="Barcode"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Login */}
//                   <div className="col-lg-3 col-sm-3">
//                     <FormLabel>Allow Negative OH</FormLabel>
//                     <FormSwitch />
                   
//                   </div>
//                   <div className="col-lg-3 col-sm-3">
//                     <FormLabel>Texable</FormLabel>
//                     <FormSwitch />
//                   </div>
//                 </div>
//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="name"
//                       component={Input}
//                       placeholder="Name"
//                       label="Name"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Type */}
//                   <div className="col-lg-6">
//                     <FormLabel>Warehouse</FormLabel>
//                     <Select options={warehouseMockData} />
//                   </div>
//                 </div>
//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="description"
//                       component={Input}
//                       placeholder="Description"
//                       label="Description"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Type */}
//                   <div className="col-lg-6">
//                     <FormLabel>Preferred Supply</FormLabel>
//                     <Select options={prefferedSupplier} />
//                   </div>
//                 </div>

//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-2">
//                     <Field
//                       name="length_dimensions"
//                       component={Input}
//                       placeholder="L"
//                       label="Dimension (L)"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   <div className="col-lg-2">
//                     <Field
//                         name="height_dimensions"
//                         component={Input}
//                         placeholder="H"
//                         label="Dimension (H)"
//                         className="form-control form-control-sm"
//                     />
//                   </div>
//                   <div className="col-lg-2">
//                     <Field
//                         name="width_dimensions"
//                         component={Input}
//                         placeholder="W"
//                         label="Dimension (W)"
//                         className="form-control form-control-sm"
//                     />
//                   </div>
//                   <div className="col-lg-6">
//                     <FormLabel>UOM</FormLabel>
//                     <Select options={prefferedSupplier} />
//                   </div>
                  
//                 </div>
                
//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-2">
//                     <FormLabel>Weight</FormLabel>
//                     <Select options={weightMockProps} />
//                   </div>
//                   <div className="col-lg-2"></div>
//                   <div className="col-lg-2"></div>
//                   <div className="col-lg-6">
//                     <FormLabel>Re-Ordering UOM</FormLabel>
//                     <Select options={prefferedSupplier} />
//                   </div>
//                 </div>
//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="on_hand_quantity"
//                       component={Input}
//                       placeholder="On Hand Quantity"
//                       label="On Hand Quantity"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Type */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="conversion_uom"
//                       component={Input}
//                       placeholder="Conversion to UOM"
//                       label="Conversion to UOM"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="available_quantity"
//                       component={Input}
//                       placeholder="Quantity Available"
//                       label="Quantity Available"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Type */}
//                   <div className="col-lg-6">
//                     <FileUpload
//                       name="inventoryFile"
//                       isSubmitting={false}
//                       filePath={thumbPath ? thumbPath : 'https://via.placeholder.com/1000x200'}
//                       endpoint={`${process.env.REACT_APP_API_BASE_URL}/inventory/uploads`}
//                       responseCallback={(res) => {
//                           setThumbPath(res.data.thumbnails);
//                           setFilePath(res.data.filePath);
//                       }}
//                       setFieldValue={(name, file) => console.log(name, '=>', file)}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="cost_price"
//                       component={Input}
//                       placeholder="Cost Price"
//                       label="Cost Price"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Type */}
//                   <div className="col-lg-6"></div>
//                 </div>

//                 <div className="form-group row">
//                   {/* Gender */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="average_cost"
//                       component={Input}
//                       placeholder="Average Cost"
//                       label="Average Cost"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                   {/* Type */}
//                   <div className="col-lg-6">
//                     <Field
//                       name="standard_cost"
//                       component={Input}
//                       placeholder="Standard Cost"
//                       label="Standard Cost"
//                       className="form-control form-control-sm"
//                     />
//                   </div>
//                 </div>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <button
//                 type="button"
//                 onClick={onHide}
//                 className="btn btn-light btn-elevate"
//               >
//                 Cancel
//               </button>
//               <> </>
//               <button
//                 type="submit"
//                 onClick={() => handleSubmit()}
//                 className="btn btn-primary btn-elevate"
//               >
//                 Save
//               </button>
//             </Modal.Footer>
//           </>
//         )}
//       </Formik>
//     </>
//   );
// }
