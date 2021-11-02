import React, {createContext, useContext, useState, useCallback , useEffect} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "../utils/UIHelpers";
import { useHistory } from "react-router-dom";
import { shallowEqual ,useDispatch, useSelector } from "react-redux";
import { callGenericAsync } from "app/generic/actions";
import * as actions from '../_redux/actions';
import * as inventoryActions from 'app/pages/inventory/_redux/actions';


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
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});
  const dispatch = useDispatch();


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

  const { inventoryState, userData } = useSelector(
    (state) => ({ 
      inventoryState: state.inventory,
      userData: state.auth.user,
    }),
    shallowEqual 
  );

  // const warehouseMockData = [
  //   {value: "1", label: "King PIN 5th Wheel"},
  //   {value: "2", label: "Alloy Rims"}
  // ];

  // const prefferedSupplier = [
  //   {value: "1", label: "Vancouver Fire Prevention"},
  // ];

  const weightMockProps = [
    {value: 1, label: "ml"},
    {value: 2, label: "g"},
    {value: 3, label: "oz"},
  ];

  const partsreturnTabs = [
    {key: "order", title: "Items"},
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

  useEffect(() => {
    dispatch(inventoryActions.getWarehouses());
    dispatch(inventoryActions.getSupplier());
  }, []);

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
    history.push(`/partsreturn/${id}/${route}`);
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
            "SALEORD_DATE" : payload?.date,
            "USE_ID_ASSIGNED_TO" : payload?.return_part_no,
            "CHANNEL_ID" :  payload?.channel,
            "REFERENCE_NUMBER" : "" ,
            "CUS_ID" : "",
            "BILL_TO_ID" :  payload?.billTo,
            "ADDRESS" :     payload?.notes ,
            "COU_ID" : "",
            "PROSTA_ID" : "",
            "CITY_NAME" : payload?.due_date ,
            "ZIP_CODE" : payload?.parts_return_listing ,
            "DISPATCH_NOTES " : "",
            "INTERNAL_NOTES " : "",
            "CUSTOMER_REPORT_NOTES" : "",
            "TERMS_CONDITION" : "",
            "USE_ID_FINALIZED_BY" : "",
            "FINALIZED_FLAG " : "N",
            "VOID_FLAG" : "N",
            "VOID_NOTES" : ""
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
          actions.fetchPartsReturnList();
          // actions.auditLogDataAsync(payload?.pOrderId, USE_ID, USERNAME);
          history.push("/partsreturn");
        }
      }))
    }



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
    billTo,
    country,
    editOrView,
    currentDate,
    currentDateTime,
    submitFormHandler,
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