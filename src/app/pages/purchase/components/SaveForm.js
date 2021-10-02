// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal, Form,Button } from "react-bootstrap";
import { Formik, Field } from "formik";
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
const EditFormSchema = Yup.object().shape({
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

export function SaveForm({
  saveCustomer,
  customer,
  actionsLoading,
  backToHome,
}) {
  const { warehouseMockData } = useUIContext();

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={EditFormSchema}
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
                <div className="row">
                  <div className="col-lg-8"></div>
                  <div className="col-lg-2 col-sm-1">
                  <Form.Group className="mb-3" controlId="completed">
                    <Form.Check type="checkbox" label="Completed" />
                  </Form.Group>
                  </div>
                  <div className="col-lg-2 col-sm-1">
                    <Form.Group className="mb-3" controlId="void">
                      <Form.Check type="checkbox" label="Void" />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4 col-sm-3">
                    <Field
                      name="PONumber"
                      component={Input}
                      placeholder="PO Number"
                      label="PO Number"
                      className="form-control "
                    />
                  </div>
                  <div className="col-lg-4 col-sm-3">
                    <Field
                      name="phone"
                      component={Input}
                      placeholder="Phone"
                      label="Phone"
                      className="form-control "
                    />
                  </div>
                  <div className="col-lg-4">
                    <FormLabel>Prepared By</FormLabel>
                    <Select options={warehouseMockData} />
                  </div>
                  
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      name="po_date"
                      component={Input}
                      placeholder="PO Date / Lead Time"
                      label="PO Date / Lead Time"
                      className="form-control "
                    />
                  </div>

                  <div className="col-lg-4">
                    <Field
                      name="reference"
                      component={Input}
                      placeholder="Reference"
                      label="Reference"
                      className="form-control "
                    />
                  </div>
                  
                  <div className="col-lg-4">
                    <Field
                      name="fax"
                      component={Input}
                      placeholder="Fax"
                      label="Fax"
                      className="form-control "
                    />
                  </div>

                </div> 

                <div className="form-group row">
                  <div className="col-lg-4">
                    <FormLabel>Supplier</FormLabel>
                    <Select options={warehouseMockData} />
                    <Button className="btn btn-dark mt-2">+ Create</Button>
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                      className="form-control "
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="notes"
                      component={Input}
                      placeholder="Notes"
                      label="Notes"
                      className="form-control "
                    />
                  </div>
                </div>
                
                
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={backToHome}
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
