import React, { useEffect, useMemo, useState } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/actions";
import { CustomerEditDialogHeader } from "./CustomerEditDialogHeader";
import { InventoryEditForm } from "./forms/InventoryEditForm";
import { useIinventoryUIContext } from "../context/InventoryUIContext";

export function InventoryEditDialog({ id, show, onHide }) {
  // Customers UI Context
  const inventoryUIContext = useIinventoryUIContext();
  const [key, setKey] = useState('details');

  const renderTabs = ({items}) => {
    return items.map((item, index) => {
      if (index === 0 && !inventoryUIContext.editState) {
        return <Tab eventKey={item.key} 
          title={item.title} 
          className="mt-2 ml-1">
          <InventoryEditForm
            onHide={onHide}
          />
        </Tab>
      } else if (index === 0 && inventoryUIContext.editState) {
        return <Tab eventKey={item.key} 
          title={item.title} 
          className="mt-2 ml-1">
          <InventoryEditForm
            onHide={onHide}
          />
        </Tab>;
      } else if (index >= 1 && inventoryUIContext.editState) {
        return <Tab eventKey={item.key} 
          title={item.title} 
          className="mt-2 ml-1">
          {item.title}
        </Tab>;
      }
      
    })
  }

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
        className="mb-3 mt-3 form-tab"
      >
        {renderTabs({items: inventoryUIContext?.inventoryTabs})}
      </Tabs>
    </Modal>
  );
}
