import React, {createContext, useContext, useState, useCallback, useEffect} from "react";
import {isEqual, isFunction} from "lodash";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as inventoryActions from 'app/pages/inventory/_redux/actions';
import {initialFilter} from "../utils/UIHelpers";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const CustomersUIConsumer = UIContext.Consumer;

export function UIProvider({receivingUIEvents, children}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);

  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const toggleSupplierHandler = () => {
    setShowSupplierModal(!showSupplierModal)
  };
  const { inventoryState, userData } = useSelector(
    (state) => ({ 
      inventoryState: state.inventory,
      userData: state.auth.user,
    }),
    shallowEqual
  );
  const {  supplier, uom, warehouses } = inventoryState;
  const {USE_ID, USERNAME} = userData;

  const warehouseMockData = warehouses;

  const prefferedSupplier = supplier;

  useEffect(() => {
    dispatch(inventoryActions.getWarehouses());
    dispatch(inventoryActions.getSupplier());
  }, []);
  

  const weightMockProps = [
    {value: 1, label: "ml"},
    {value: 2, label: "g"},
    {value: 3, label: "oz"},
  ];

  const receivingTabs = [
    {key: "order", title: "Product"},
    {key: "storage", title: "Storage"},
    
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
    receivingTabs,
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