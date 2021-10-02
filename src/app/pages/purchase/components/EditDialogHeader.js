import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../_metronic/_partials/controls";

export function CustomerEditDialogHeader({ id, headerTitle }) {
  // Customers Redux state
  const { customerForEdit, actionsLoading } = useSelector(
    (state) => ({
      customerForEdit: state.customers.customerForEdit,
      actionsLoading: state.customers.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Parts";
    if (customerForEdit && id) {
      _title = `Edit Parts '${customerForEdit.firstName} ${customerForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [customerForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{headerTitle}</Modal.Title>
      </Modal.Header>
    </>
  );
}
