// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  DatePickerField,
} from "../../../../_metronic/_partials/controls";
import { FormLabel } from "react-bootstrap";
import { FormSwitch } from "./FormSwitch";
import { useCustomersUIContext } from "../context/InventoryUIContext";
import FileUpload from '../../../utils/FileUpload';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';



// Validation schema
const InventoryEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  ipAddress: Yup.string().required("IP Address is required"),
});

export function InventoryEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,
}) {
  const { warehouseMockData, prefferedSupplier, weightMockProps } = useCustomersUIContext();
  const [thumbPath, setThumbPath] = useState([]);
  const [filePath, setFilePath] = useState([]);

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
}
