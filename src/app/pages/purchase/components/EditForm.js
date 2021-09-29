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
import { useUIContext } from "../context/UIContext";
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
  const { warehouseMockData, prefferedSupplier, weightMockProps } = useUIContext();

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
                  <div className="col-lg-4 col-sm-4">
                    <Field
                      name="PONumber"
                      component={Input}
                      placeholder="PO Number"
                      label="PO Number"
                      className="form-control "
                    />
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <Field
                      name="PODate"
                      component={Input}
                      placeholder="PO Date"
                      label="PO Date"
                      className="form-control "
                    />
                  </div>

                  <div className="col-lg-2 col-sm-2">
                    <FormLabel>Closed</FormLabel>
                    <FormSwitch />
                   
                  </div>
                  <div className="col-lg-2 col-sm-2">
                    <FormLabel>Void</FormLabel>
                    <FormSwitch />
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  
                  <div className="col-lg-4">
                    <FormLabel>Supplier</FormLabel>
                    <Select options={warehouseMockData} />
                  </div>
                 
                  <div className="col-lg-4">
                    <FormLabel>Warehouse</FormLabel>
                    <Select options={warehouseMockData} />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="average_cost"
                      component={Input}
                      placeholder="Reference"
                      label="Reference"
                      className="form-control"
                    />
                  </div>
                  
                </div>
                <div className="form-group row">
                  {/* Gender */}
                  <div className="col-lg-4">
                    <Field
                      name="description"
                      component={Input}
                      placeholder="Phone"
                      label="Phone"
                      className="form-control "
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="description"
                      component={Input}
                      placeholder="Fax"
                      label="Fax"
                      className="form-control "
                    />
                  </div>
                  {/* Type */}
                  <div className="col-lg-4">
                    <Field
                      name="description"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                      className="form-control "
                    />
                  </div>
                </div> 
                <div className="form-group row">
                  <div className="col-lg-6">
                    <Field
                      name="standard_cost"
                      component={Input}
                      placeholder="Notes"
                      label="Notes"
                      className="form-control form-control-xl"
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
