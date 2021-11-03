import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";
import { callGenericAsync } from "app/generic/actions";
import * as actions from '../_redux/actions';
import { shallowEqual ,useDispatch, useSelector } from "react-redux";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const UIConsumer = UIContext.Consumer;

export function UIProvider({salesreturnUIEvents, children}) {
  const history = useHistory();
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const dispatch = useDispatch()

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

  const weightMockProps = [
    {value: 1, label: "ml"},
    {value: 2, label: "g"},
    {value: 3, label: "oz"},
  ];

  const salesreturnTabs = [
    {key: "order", title: "Product"},
    {key: "auditlog", title: "AuditLog"},

  ];

  const { supplier, uom, warehouses } = inventoryState;
  const billTo = [
    {
      ID : '1',
      TITLE : 'Salman',
    }
  ] 

  const country = [
    {
      ID : '1',
      TITLE : 'Pakistan',
    }
  ] 
  const warehouseMockData = warehouses;
  const prefferedSupplier = supplier;

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
      history.push(`/salesreturn/${id}/${route}`);
    }

    const setEditDataAsync = (id) => {
      const getDataPayload = {
        data: {
            "SALEORD_ID" : id,
        },
        "action": "InventoryWeb",
        "method": "GetSalesOrder",
        "type": "rpc",
        "tid": "144"
      };
  
      dispatch(callGenericAsync(getDataPayload, "/InventoryWeb/GetSaleOrder", "post", (res) => {
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
              // "SALEORD_ID" : "", 
              "SALEORD_DATE"                : payload?.date,
              "USE_ID_ASSIGNED_TO"          : payload?.use_id_assinged_by,
              "CHANNEL_ID"                  : payload?.channel,
              "REFERENCE_NUMBER"            : payload?.ref_num ,
              "CUS_ID"                      : payload?.cus_id,
              "BILL_TO_ID"                  : payload?.billTo,
              "ADDRESS"                     : payload?.address ,
              "COU_ID"                      : payload?.cou_id,
              "PROSTA_ID"                   : payload?.prosta_id,
              "CITY_NAME"                   : payload?.city ,
              "ZIP_CODE"                    : payload?.zip_code ,
              "DISPATCH_NOTES "             : "",
              "INTERNAL_NOTES "             : "",
              "CUSTOMER_REPORT_NOTES"       : "",
              "TERMS_CONDITION"             : termsAndConditions,
              "USE_ID_FINALIZED_BY"         : "N",
              "FINALIZED_FLAG "             : "N",
              "VOID_FLAG"                   : "N",
              "VOID_NOTES"                  : "N"
        },
            "action": "InventoryWeb",
            "method": "PostSaleOrder",
            "type": "rpc",
            "tid": "144"
        };
    
        if (payload?.salesorder_ID) {
          formPayload.data.SALEORD_ID = payload?.salesorder_ID;
        }
    
        dispatch(callGenericAsync(formPayload, '/InventoryWeb/PostSaleOrder', 'post', (res) => {
          setSubmitting(false);
          if (res?.CODE === 'SUCCESS') { 
            actions.fetchSalesReturnList();
            // actions.auditLogDataAsync(payload?.pOrderId, USE_ID, USERNAME);
            history.push("/salesreturn");
          }
        }))
      }


  const backToHome = () => {
    history.push('/salesreturn');
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
    salesreturnTabs,
    backToHome,
    editOrView,
    currentDate,
    currentDateTime,
    billTo,
    editMode,
    setEditMode,
    tempData,
    setTempData,
    submitFormHandler,
    setTermsAndConditions,
    country,
    showSupplierModal,
    toggleSupplierHandler,
    newSalesReturnForm: salesreturnUIEvents.newSalesReturnForm,
    editSalesReturnForm: salesreturnUIEvents.editSalesReturnForm,
    openDeleteCustomerDialog: salesreturnUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: salesreturnUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: salesreturnUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: salesreturnUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}