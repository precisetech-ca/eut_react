import React, {createContext, useContext, useState} from "react";

const InventoryUIContext = createContext();

export function useIinventoryUIContext() {
  return useContext(InventoryUIContext);
}

export const InventoryUIConsumer = InventoryUIContext.Consumer;

export function InventoryUIProvider({customersUIEvents, children}) {
  const [ids, setIds] = useState([]);
  const [edit, setEdit] = useState(false);

  const setEditHandler = (value) => {
    setEdit(value);
  }
  const warehouseMockData = [
    {value: "1", label: "King PIN 5th Wheel"},
    {value: "2", label: "Alloy Rims"}
  ];

  const prefferedSupplier = [
    {value: "1", label: "Vancouver Fire Prevention"},
  ];

  const weightMockProps = [
    {value: 1, label: "ml"},
    {value: 2, label: "g"},
    {value: 3, label: "oz"},
  ];

  const inventoryTabs = [
    {key: "details", title: "Details", Component: () => <h1>hello</h1>},
    {key: "override_amount", title: "Override Amount"},
    {key: "price_list", title: "Price List"},
    {key: "catalog", title: "Catalog"},
    {key: "override_supplier_by_inventory", title: "Override Supplier By Inventory"},
    {key: "attachments", title: "Attachments"},
    {key: "stock_availability", title: "Stock Availability"},
    {key: "history", title: "History"},
    {key: "part_interchange", title: "Part Interchange"},
    {key: "audit_log", title: "Audit Log"},
  ];

  const value = {
    ids,
    setIds,
    newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
    openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
    openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: customersUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: customersUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: customersUIEvents.openUpdateCustomersStatusDialog,
    warehouseMockData,
    prefferedSupplier,
    weightMockProps,
    inventoryTabs,
    setEditHandler,
    editState: edit,
  };

  return <InventoryUIContext.Provider value={value}>{children}</InventoryUIContext.Provider>;
}