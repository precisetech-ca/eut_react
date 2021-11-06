import React, {createContext, useContext, useState, useCallback, useEffect} from "react";
import {isEqual, isFunction} from "lodash";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as inventoryActions from 'app/pages/inventory/_redux/actions';
import * as actions from '../_redux/actions';
import * as purchaseActions from 'app/pages/purchase/_redux/actions';
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
  const [tempData, setTempData] = useState({});
  const [editMode, setEditMode] = useState(false);


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
    dispatch(purchaseActions.fetchPurchaseList());
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

  const editOrView = (id, route = 'edit') => {
    setEditDataAsync(id);
    setEditMode(true);
    history.push(`/receiving/${id}/${route}`);
  }
  

  const setEditDataAsync = (id) => {
    const getDataPayload = {
      "data": {
          "INVREC_ID" : id,
      },
      "action": "InventoryWeb",
      "method": "GetRecieving",
      "type": "rpc",
      "tid": "144"
    };

    dispatch(callGenericAsync(getDataPayload, "/InventoryWeb/GetRecieving", "post", (res) => {
      if (res?.CODE === "SUCCESS") {
        setTempData(res?.Result[0]);
      }
    }))
  }

  
  const currentDate = () => {
    var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
    month = "0" + month;
    if (day < 10) 
    day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    return today;
  }

  const currentDateTime = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = date+'T'+time;
    return dateTime;
  }



  const submitFormHandler = ({payload, resetForm, setSubmitting}) => {
    const formPayload = {
      data: {
        "INVREC_ID"     			: "" ,
        "WAR_ID" 					:           payload?.warehouse,
        "VEN_ID"     				:         payload?.supplier,
        "RECEIVING_NUMBER"     		:   payload?.receiving_number,
        "RECEIVING_DATE"        	:   payload?.receiving_date,
        "REFERENCE_NUMBER"     		:   payload?.reference,
        "PURORD_ID"       			:     payload?.po_number,
        "NOTES"      				:         payload?.notes,
        "SUPPLIER_INVOICE_NUMBER"   : payload?.invoice_no,
        "USE_ID_PREPARED_BY"       	: USE_ID,
        "PREPARED_DATE"       		:   dateFormat( new Date(), "yyyy-mm-dd"),
        "VOID_FLAG"       			:     "N",
        "FINZ_FLAG"       			:     "N",
        "VOID_NOTES"       			:     "",
        "FINZ_USE_ID"       		:     USE_ID,
        "FINAL_DATE"       			:     "",
        "SUP_INVOICE_DATE"       	:   payload?.invoice_date,
        "SUP_INVOICE_DUE_DATE"      : "",
        "TERMS_CONDITION"           : "",
        "RACK"           			:       payload?.rack,
        "SHELF"           			:     payload?.shelf,
        "BIN"           			:       payload?.bin
      },
      "action": "InventoryWeb",
      "method": "PostRecieving",
      "username": "admin",
      "type": "rpc",
      "tid": "144"
    };

    if (payload?.recId) {
      formPayload.data.INVREC_ID = payload?.recId;
    }

    dispatch(callGenericAsync(formPayload, '/InventoryWeb/PostRecieving', 'post', (res) => {
      setSubmitting(false);
      if (res?.CODE === 'SUCCESS') { 
        actions.fetchReceivingList();
        actions.auditLogDataAsync(payload?.po_number, USE_ID, USERNAME);
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
    currentDate,
    currentDateTime,
    editOrView,
    tempData,
    setTempData,
    editMode,
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