// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
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
import Select from 'react-select'

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
                    <Field
                      name="details"
                      component={Input}
                      placeholder="Details"
                      label="SKU"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Last Name */}
                  
                  {/* Login */}
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Stock Item</FormLabel>
                    <FormSwitch />
                   
                  </div>
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Status</FormLabel>
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
                      label="Barcode"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Login */}
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Allow Negative OH</FormLabel>
                    <FormSwitch />
                   
                  </div>
                  <div className="col-lg-3 col-sm-3">
                    <FormLabel>Texable</FormLabel>
                    <FormSwitch />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Name"
                      label="Name"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Type */}
                  <div className="col-lg-6">
                    <FormLabel>Warehouse</FormLabel>
                    <Select options={warehouseMockData} />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="description"
                      component={Input}
                      placeholder="Description"
                      label="Description"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Type */}
                  <div className="col-lg-6">
                    <FormLabel>Preferred Supply</FormLabel>
                    <Select options={prefferedSupplier} />
                  </div>
                </div>

                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-2">
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
                  </div>
                  <div className="col-lg-6">
                    <FormLabel>UOM</FormLabel>
                    <Select options={prefferedSupplier} />
                  </div>
                  
                </div>
                
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-2">
                    <FormLabel>Weight</FormLabel>
                    <Select options={weightMockProps} />
                  </div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-6">
                    <FormLabel>Re-Ordering UOM</FormLabel>
                    <Select options={prefferedSupplier} />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="on_hand_quantity"
                      component={Input}
                      placeholder="On Hand Quantity"
                      label="On Hand Quantity"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Type */}
                  <div className="col-lg-6">
                    <Field
                      name="conversion_uom"
                      component={Input}
                      placeholder="Conversion to UOM"
                      label="Conversion to UOM"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="available_quantity"
                      component={Input}
                      placeholder="Quantity Available"
                      label="Quantity Available"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Type */}
                  <div className="col-lg-6"></div>
                </div>

                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-6">
                    <Field
                      name="cost_price"
                      component={Input}
                      placeholder="Cost Price"
                      label="Cost Price"
                      className="form-control form-control-sm"
                    />
                  </div>
                  {/* Type */}
                  <div className="col-lg-6"></div>
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
                    <Field
                      name="standard_cost"
                      component={Input}
                      placeholder="Standard Cost"
                      label="Standard Cost"
                      className="form-control form-control-sm"
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
