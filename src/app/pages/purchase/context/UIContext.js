import React, {createContext, useContext, useState, useCallback, useEffect} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { callGenericAsync } from "app/generic/actions";
import * as actions from '../_redux/actions';
import * as inventoryActions from 'app/pages/inventory/_redux/actions';

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const CustomersUIConsumer = UIContext.Consumer;

export function UIProvider({purchaseUIEvents, children}) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [voidModal, setVoidModal] = useState(false);
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    dispatch(inventoryActions.getWarehouses());
    dispatch(inventoryActions.getSupplier());
  }, []);
  const toggleSupplierHandler = () => {
    setShowSupplierModal(!showSupplierModal)
  };

  const toggleVoidHandler = () => {
    setVoidModal(!voidModal)
  };

  const { inventoryState, userData } = useSelector(
    (state) => ({ 
      inventoryState: state.inventory,
      userData: state.auth.user,
    }),
    shallowEqual
  );
  const {  supplier, uom, warehouses } = inventoryState;
  const {USE_ID} = userData;

  const warehouseMockData = warehouses;

  const prefferedSupplier = supplier;

  const weightMockProps = [
    {value: 1, label: "ml"},
    {value: 2, label: "g"},
    {value: 3, label: "oz"},
  ];

  const inventoryTabs = [
    {key: "order", title: "Product"},
    {key: "audit", title: "Audit Log"},
  ];

  const editOrView = (id, route = 'edit') => {
    setEditData(id);
    history.push(`/purchase/${id}/${route}`);
  }
  
  const setEditData = (id) => {
    const editMockPayload = {
      "PURORD_ID" : "",
      "WAR_ID" : 78767,
      "VEN_ID" : 78618,
      "PO_DATE" : "2021-11-03T23:56",
      "REFERENCE_NUMBER" : "Test - 12345",
      "NOTES" : "Testing comments",
      "USE_ID_PREPARED_BY" : USE_ID,
      "PREPARED_DATE" : "2021-11-03T23:56",
      "VOID_FLAG" : "Y",
      "VOID_NOTES" : "Notes test",
      "ETA_DATE" : "",
      "FNZ_FLAG" : "",
      "FNZ_USE_ID" : ""
    };
    // const editPayload = {
    //   "data":
    //   {  
    //     "PAR_ID"   		: id,
    //     "SEARCH"   		: ""
    //   }, 
    //   "action": "ITEMMASTER",
    //   "method": "GetPartAttachments",
    //   "username": "admin",
    //   "password": "admin",
    //   "type": "rpc",
    //   "tid": "144"
    // };

    // dispatch(callGenericAsync(editPayload, "/itemmaster/GetPartDetails", "post", (res) => {
    //   if (res?.CODE === "SUCCESS") {
    //     setTempData(res?.Result[0]);
    //   }
    // }))
    setTimeout(() => {
      setTempData(editMockPayload);
    }, 1000);
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
    console.log(payload);
    const formPayload = {
      data: {
        "PURORD_ID" : "",
        "WAR_ID" : "78767",
        "VEN_ID" : payload?.supplier,
        "PO_DATE" : payload?.po_date,
        "REFERENCE_NUMBER" : payload?.reference,
        "NOTES" : payload?.notes,
        "USE_ID_PREPARED_BY" : USE_ID,
        "PREPARED_DATE" : new Date(),
        "VOID_FLAG" : "",
        "VOID_NOTES" : "",
        "ETA_DATE" : "",
        "FNZ_FLAG" : "",
        "FNZ_USE_ID" : ""
      },
      "action": "InventoryWeb",
      "method": "PostPurchaseOrder",
      "type": "rpc",
      "tid": "144"
    };

    dispatch(callGenericAsync(formPayload, '/InventoryWeb/PostPurchaseOrder', 'post', (res) => {
      setSubmitting(false);
      if (res?.CODE === 'SUCCESS') { 
        actions.deletePurchaseList();
      }
    }))
  }


  const backToHome = () => {
    history.push('/purchase');
  }

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    warehouseMockData,
    prefferedSupplier,
    weightMockProps,
    inventoryTabs,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    submitFormHandler,
    currentDate,
    currentDateTime,
    setEditData,
    tempData,
    setTempData,
    editOrView,
    toggleVoidHandler,
    voidModal,
    newPurchaseForm: purchaseUIEvents.newPurchaseForm,
    editPurchaseForm: purchaseUIEvents.editPurchaseForm,
    openDeleteCustomerDialog: purchaseUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: purchaseUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: purchaseUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: purchaseUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}