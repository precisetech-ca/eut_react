import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";

const PartsReturnUIContext = createContext();

export function usePartsReturnUIContext() {
  return useContext(PartsReturnUIContext);
}

export const PartsReturnUIConsumer = PartsReturnUIContext.Consumer;

export function PartsReturnUIProvider({partsreturnUIEvents, children}) {
  const history = useHistory();
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [isViewable, setIsViewable] = useState(false);


  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const toggleSupplierHandler = () => {
    setShowSupplierModal(!showSupplierModal)
  };

  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const toggleAddPartHandler = () => {
    setShowAddPartModal(!showAddPartModal)
  };

  const [showNewPartModal, setShowNewPartModal] = useState(false);
  const toggleNewPartHandler = () => {
    setShowNewPartModal(!showNewPartModal)
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

  const partsreturnTabs = [
    {key: "order", title: "Items"},
   
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
    history.push('/partsreturn');
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
    partsreturnTabs,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    showAddPartModal,
    toggleAddPartHandler,
    showNewPartModal,
    toggleNewPartHandler,
    isViewable,
    setIsViewable,
    newPartsReturnForm: partsreturnUIEvents.newPartsReturnForm,
    editPartsReturnForm: partsreturnUIEvents.editPartsReturnForm,
    openDeleteCustomerDialog: partsreturnUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: partsreturnUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: partsreturnUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: partsreturnUIEvents.openUpdateCustomersStatusDialog,
  };

  return <PartsReturnUIContext.Provider value={value}>{children}</PartsReturnUIContext.Provider>;
}