import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const CustomersUIConsumer = UIContext.Consumer;

export function UIProvider({salesorderUIEvents, children}) {
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

  const salesorderTabs = [
    {key: "order", title: "Product"},
    {key: "fullfilment", title: "Fullfilment"},
    {key: "dispatch", title: "Dispatch"},
    {key: "delivery", title: "Delivery"},
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


  const backToHome = () => {
    history.push('/salesorder');
  }

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    warehouseMockData,
    prefferedSupplier,
    weightMockProps,
    salesorderTabs,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    newSalesOrderForm: salesorderUIEvents.newSalesOrderForm,
    editSalesOrderForm: salesorderUIEvents.editSalesOrderForm,
    openDeleteCustomerDialog: salesorderUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: salesorderUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: salesorderUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: salesorderUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}