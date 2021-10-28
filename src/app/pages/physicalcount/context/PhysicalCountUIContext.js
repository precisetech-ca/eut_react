import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";

const PhysicalCountUIContext = createContext();

export function usePhysicalCountUIContext() {
  return useContext(PhysicalCountUIContext);
}

export const PhysicalCountUIConsumer = PhysicalCountUIContext.Consumer;

export function PhysicalCountUIProvider({physicalscountUIEvents, children}) {
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

  const physicalcountTabs = [
    {key: "order", title: "Physical Count Item"},
   
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
    history.push('/physicalcount');
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
    physicalcountTabs,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    showAddPartModal,
    toggleAddPartHandler,
    showNewPartModal,
    toggleNewPartHandler,
    isViewable,
    setIsViewable,
    newPhysicalCountForm: physicalscountUIEvents.newPhysicalCountForm,
    editPhysicalCountForm: physicalscountUIEvents.editPhysicalCountForm,
    openDeleteCustomerDialog: physicalscountUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: physicalscountUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: physicalscountUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: physicalscountUIEvents.openUpdateCustomersStatusDialog,
  };

  return <PhysicalCountUIContext.Provider value={value}>{children}</PhysicalCountUIContext.Provider>;
}