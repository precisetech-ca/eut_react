import React, {createContext, useContext, useState, useCallback , useEffect} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { callGenericAsync } from "app/generic/actions";
import * as actions from '../_redux/actions';
import * as inventoryActions from 'app/pages/inventory/_redux/actions';
import * as defaultActions from 'app/reducers/actions';



const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const CustomersUIConsumer = UIContext.Consumer;

export function UIProvider({salesorderUIEvents, children}) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [tempData, setTempData] = useState({});
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  
  const toggleSupplierHandler = () => {
    setShowSupplierModal(!showSupplierModal)
  };

  const { inventoryState, userData , defaultData } = useSelector(
    (state) => ({ 
      inventoryState: state.inventory,
      userData: state.auth.user,
      defaultData : state.default
    }),
    shallowEqual 
  );

  const { channels , state , country , customers} = defaultData;
  const { supplier, uom, warehouses } = inventoryState;
  const {USE_ID, USERNAME} = userData;
  const billTo = customers;

  const warehouseMockData = warehouses;
  const prefferedSupplier = supplier;
  const channelsData = channels ;
  const provinceSates = state ;
  const countryNames = country ;
  const customerGroup = customers ; 

  useEffect(() => {
      dispatch(defaultActions.getChannels());
      dispatch(defaultActions.getCountry());
      dispatch(defaultActions.getCustomers());
      dispatch(defaultActions.getState());
  }, []);



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

  const editOrView = (id, route = 'edit') => {
    setEditDataAsync(id);
    setEditMode(true);
    history.push(`/salesorder/${id}/${route}`);
  }
  

  const setEditDataAsync = (id) => {
    const getDataPayload = {
      "data": {
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
        console.log(tempData)
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
          "SALEORD_DATE"              : payload?.date,
          "USE_ID_ASSIGNED_TO"        : 1,
          "CHANNEL_ID"                : payload?.channel,
          "REFERENCE_NUMBER"          : payload?.ref_num ,
          "CUS_ID"                    : "76037",
          "BILL_TO_ID"                : payload?.bill_to,
          "ADDRESS"                   : payload?.address ,
          "COU_ID"                    : payload?.country,
          "PROSTA_ID"                 : payload?.state,
          "CITY_NAME"                 : payload?.city ,
          "ZIP_CODE"                  : payload?.zip_code, 
          "DISPATCH_NOTES"            : "N",
          "INTERNAL_NOTES"            : "N",
          "CUSTOMER_REPORT_NOTES"     : "N",
          "TERMS_CONDITION"           : termsAndConditions,
          "USE_ID_FINALIZED_BY"       : "",
          "FINALIZED_FLAG "           : "N",
          "VOID_FLAG"                 : "N",
          "VOID_NOTES"                : ""
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
        actions.fetchSalesOrderList();
        // actions.auditLogDataAsync(payload?.pOrderId, USE_ID, USERNAME);
        history.push("/salesorder");
      }
    }))
  }

 


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
    channelsData,
    provinceSates,
    salesorderTabs,
    countryNames,
    customerGroup,
    editOrView,
    editMode,
    tempData,
    billTo,
    country,
    setTempData,
    currentDate,
    currentDateTime,
    backToHome,
    showSupplierModal,
    toggleSupplierHandler,
    submitFormHandler,
    termsAndConditions,
    setTermsAndConditions,
    newSalesOrderForm: salesorderUIEvents.newSalesOrderForm,
    editSalesOrderForm: salesorderUIEvents.editSalesOrderForm,
    openDeleteCustomerDialog: salesorderUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: salesorderUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: salesorderUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog: salesorderUIEvents.openUpdateCustomersStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}