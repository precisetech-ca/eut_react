import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const CustomersUIConsumer = UIContext.Consumer;

export function UIProvider({receivingUIEvents, children}) {
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
    {key: "order", title: "Product"},
    {key: "audit", title: "Audit Log"},
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
    history.push('/receiving');
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
    inventoryTabs,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    newReceivingForm: receivingUIEvents.newReceivingForm,
    editReceivingForm: receivingUIEvents.editReceivingForm,
    openDeleteCustomerDialog: receivingUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: receivingUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: receivingUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: receivingUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}