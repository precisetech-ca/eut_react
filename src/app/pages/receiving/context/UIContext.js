import React, {createContext, useContext, useState, useCallback, useEffect} from "react";
import {isEqual, isFunction} from "lodash";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as inventoryActions from 'app/pages/inventory/_redux/actions';
import * as actions from '../_redux/actions';
import {initialFilter} from "../utils/UIHelpers";
import dateFormat from "dateformat";
import { callGenericAsync } from "app/generic/actions";

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


  const submitFormHandler = ({payload, resetForm, setSubmitting}) => {
    console.log(payload);
    const formPayload = {
      data: {
        "INVREC_ID"     			: "",
        "WAR_ID" 					: payload?.warehouse,
        "VEN_ID"     				: payload?.supplier,
        "RECEIVING_NUMBER"     		: payload?.receiving_number,
        "RECEIVING_DATE"        	: payload?.receiving_date,
        "REFERENCE_NUMBER"     		: payload?.reference,
        "PURORD_ID"       			: payload?.po_number,
        "NOTES"      				: payload?.notes,
        "SUPPLIER_INVOICE_NUMBER"   : payload?.invoice_no,
        "USE_ID_PREPARED_BY"       	: USE_ID,
        "PREPARED_DATE"       		: dateFormat( new Date(), "yyyy-mm-dd"),
        "VOID_FLAG"       			: "N",
        "FINZ_FLAG"       			: "N",
        "VOID_NOTES"       			: "",
        "FINZ_USE_ID"       		: USE_ID,
        "FINAL_DATE"       			: "",
        "SUP_INVOICE_DATE"       	: payload?.invoice_date,
        "SUP_INVOICE_DUE_DATE"      : "",
        "TERMS_CONDITION"           : "",
        "RACK"           			: payload?.rack,
        "SHELF"           			: payload?.shelf,
        "BIN"           			: payload?.bin
      },
      "action": "InventoryWeb",
      "method": "PostRecieving",
      "type": "rpc",
      "tid": "144"
    };

    if (payload?.pOrderId) {
      formPayload.data.INVREC_ID = payload?.pOrderId;
    }

    dispatch(callGenericAsync(formPayload, '/InventoryWeb/PostRecieving', 'post', (res) => {
      setSubmitting(false);
      if (res?.CODE === 'SUCCESS') { 
        actions.fetchReceivingList();
        // actions.auditLogDataAsync(payload?.pOrderId, USE_ID, USERNAME);
        history.push("/receiving");
      }
    }))
  }

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
    submitFormHandler,
    newReceivingForm: receivingUIEvents.newReceivingForm,
    editReceivingForm: receivingUIEvents.editReceivingForm,
    openDeleteCustomerDialog: receivingUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: receivingUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: receivingUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: receivingUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}