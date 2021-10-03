import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const CustomersUIConsumer = UIContext.Consumer;

export function UIProvider({purchaseUIEvents, children}) {
  const history = useHistory();
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);

  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const toggleSupplierHandler = () => {
    setShowSupplierModal(!showSupplierModal)
  };

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
    {key: "order", title: "Product", Component: () => <h1>hello</h1>},
    {key: "order_detail", title: "Receiving"},
    {key: "Storage", title: "Storage"},
    {key: "catalog", title: "Payables"},
    {key: "audit", title: "Audit Log"},
    // {key: "override_supplier_by_inventory", title: "Override Supplier By Inventory"},
    // {key: "attachments", title: "Attachments"},
    // {key: "stock_availability", title: "Stock Availability"},
    // {key: "history", title: "History"},
    // {key: "part_interchange", title: "Part Interchange"},
    // {key: "audit_log", title: "Audit Log"},
  ];

  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initCustomer = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    type: 1
  };

  const backToHome = () => {
    history.push('/purchase');
  }

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCustomer,
    warehouseMockData,
    prefferedSupplier,
    weightMockProps,
    inventoryTabs,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    newPurchaseForm: purchaseUIEvents.newPurchaseForm,
    editPurchaseForm: purchaseUIEvents.editPurchaseForm,
    openDeleteCustomerDialog: purchaseUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: purchaseUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: purchaseUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: purchaseUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}