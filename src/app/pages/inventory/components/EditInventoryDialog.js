import React, { useEffect, useMemo, useState } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { CustomerEditDialogHeader } from "./CustomerEditDialogHeader";
import { InventoryEditForm } from "./InventoryEditForm";
import { useCustomersUIContext } from "../context/InventoryUIContext";

export function InventoryEditDialog({ id, show, onHide }) {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const [key, setKey] = useState('details');
  const customersUIProps = useMemo(() => {
    return {
      initCustomer: customersUIContext.initCustomer,
    };
  }, [customersUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, customerForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.customers.actionsLoading,
      customerForEdit: state.customers.customerForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Customer by id
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  // server request for saving customer
  const saveCustomer = (customer) => {
    if (!id) {
      // server request for creating customer
      dispatch(actions.createCustomer(customer)).then(() => onHide());
    } else {
      // server request for updating customer
      dispatch(actions.updateCustomer(customer)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CustomerEditDialogHeader id={id} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-3"
      >
        {customersUIContext.inventoryTabs.map(({key, title}) => 
        <Tab eventKey={key} 
              title={title} 
              className="mt-2 ml-1">
          {key === "details" ? <InventoryEditForm
            saveCustomer={saveCustomer}
            actionsLoading={actionsLoading}
            customer={customerForEdit || customersUIProps.initCustomer}
            onHide={onHide}
          /> : <h1>{title}</h1>}
        </Tab>)}
      </Tabs>
    </Modal>
  );
}
