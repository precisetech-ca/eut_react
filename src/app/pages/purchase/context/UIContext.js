import React, {createContext, useContext, useState, useCallback, useEffect} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { callGenericAsync } from "app/generic/actions";
import * as purchaseActions from '../_redux/actions';
import * as inventoryActions from 'app/pages/inventory/_redux/actions';
import dateFormat from "dateformat";
import {  callTypes, purchaseSlice } from "app/pages/purchase/_redux/purchaseSlice";
const { actions } = purchaseSlice;

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
  const [editMode, setEditMode] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [voidModal, setVoidModal] = useState(false);
  const [tempData, setTempData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [selectedPart, setSelectedPart] = useState({});

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
  
  const { supplier, uom, warehouses } = inventoryState;
  const {USE_ID, USERNAME} = userData;
  const warehouseMockData = warehouses;
  const prefferedSupplier = supplier;

  useEffect(() => {
    dispatch(inventoryActions.inventoryItemsFetched());
    dispatch(inventoryActions.getWarehouses());
    dispatch(inventoryActions.getSupplier());
    dispatch(inventoryActions.getPartsUom());
  }, []);

  const setEditHandler = (flag) => {
    setIsEdit(flag);
  }

  const weightMockProps = [
    {value: 1, label: "ml"},
    {value: 2, label: "g"},
    {value: 3, label: "oz"},
  ];

  const purchaseTabs = [
    {key: "order", title: "Product"},
    {key: "audit", title: "Audit Log"},
  ];

  const editOrView = (id, route = 'edit') => {
    setEditHandler(true);
    setEditDataAsync(id);
    setEditMode(true);
    history.push(`/purchase/${id}/${route}`);
  }
  

  const setEditDataAsync = (id) => {
    const getDataPayload = {
      "data": {
          "PURORD_ID" : id
      }, 
      "action": "InventoryWeb",
      "method": "GetPurchaseOrder",
      "type": "rpc",
      "tid": "144"
    };

    dispatch(callGenericAsync(getDataPayload, "/InventoryWeb/GetPurchaseOrder", "post", (res) => {
      if (res?.CODE === "SUCCESS") {
        dispatch(actions.purchaseDetailsFetched({
          callType: callTypes.action,
          entities: res?.Result?.INV_PURCHASE_ORDER_DETAILS_WV
        }));
        setTempData(res?.Result?.INV_PURCHASE_ORDERS_WV[0]);
      }
    }))
  }

  const setSelectedSupplierHandler = (id) => {
    const selectedInv = inventoryState.supplier.filter(s => s.VEN_ID == id);
    setSelectedSupplier(selectedInv[0]);
  }

  const setSelectedPartHandler = (id) => {
    const selectedInv = inventoryState.inventoryItems.filter(s => s.PAR_ID == id);
    setSelectedPart(selectedInv[0]);
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
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var hour = today.getHours();
    var meridiem = hour >= 12 ? "PM" : "AM";
    var dateTime = date+' '+time + ' ' + meridiem;
    return dateTime;
  }

  const submitFormHandler = ({payload, resetForm, setSubmitting}) => {
    const formPayload = {
      data: {
        "WAR_ID"                : "",
        "VEN_ID"                : payload?.supplier,
        "PO_DATE"               : payload?.po_date,
        "REFERENCE_NUMBER"      : payload?.reference,
        "NOTES"                 : payload?.notes,
        "USE_ID_PREPARED_BY"    : USE_ID,
        "PREPARED_DATE"         : dateFormat( new Date(), "yyyy-mm-dd"),
        "VOID_FLAG"             : "",
        "VOID_NOTES"            : "",
        "ETA_DATE"              : "",
        "FNZ_FLAG"              : "",
        "FNZ_USE_ID"            : ""
      },
      "action": "InventoryWeb",
      "method": "PostPurchaseOrder",
      "type": "rpc",
      "tid": "144"
    };

    if (payload?.pOrderId) {
      formPayload.data.PURORD_ID = payload?.pOrderId;
    }

    dispatch(callGenericAsync(formPayload, '/InventoryWeb/PostPurchaseOrder', 'post', (res) => {
      setSubmitting(false);
      if (res?.CODE === 'SUCCESS') { 
        purchaseActions.fetchPurchaseList();
        purchaseActions.auditLogDataAsync(payload?.pOrderId, USE_ID, USERNAME);
        history.push("/purchase");
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
    purchaseTabs,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    submitFormHandler,
    currentDate,
    currentDateTime,
    setEditDataAsync,
    tempData,
    setTempData,
    editOrView,
    toggleVoidHandler,
    voidModal,
    editMode,
    setEditMode,
    setEditHandler,
    isEdit,
    selectedSupplier,
    setSelectedSupplierHandler,
    userData,
    setSelectedPartHandler,
    selectedPart,
    newPurchaseForm: purchaseUIEvents.newPurchaseForm,
    editPurchaseForm: purchaseUIEvents.editPurchaseForm,
    openDeleteCustomerDialog: purchaseUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: purchaseUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: purchaseUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: purchaseUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}