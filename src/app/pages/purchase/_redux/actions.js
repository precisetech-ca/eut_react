import { callGenericAsync, callGenericGetterAsync } from "app/generic/actions";
import { data, purchaseData, auditLogData } from "./mock/product.mock";
import { purchaseSlice, callTypes } from "./purchaseSlice";
const { actions } = purchaseSlice;

export const addProduct = () => dispatch => {
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  dispatch(actions.deleteProduct(id));
}

export const deletePurchaseList = (id) => dispatch => {
  dispatch(actions.deletePurchaseListItem(id)); 
}


export const fetchPurchaseList = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));


  const callPayload = {
    "data": {
      "SEARCH"     	: "",
      "VOID_FLAG" 	: "",
      "ORDER"     	: "",
      "LOC_ID"     	: "",
      "OFFSET"        : "",
      "RNUM_FROM"     : "",
      "RNUM_TO"       : "",
      "FINZ_FLAG"     : ""
    },
    "action": "InventoryWeb",
    "method": "GetPurchaseOrderList",
    "type": "rpc",
    "tid": "144"
  };

  dispatch(callGenericAsync(callPayload, '/InventoryWeb/GetPurchaseOrderList', 'post', (res => {
    if (res?.CODE === 'SUCCESS') {
      dispatch(actions.purchaseListFetched({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  })));
};

export const auditLogDataAsync = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.auditLogs({
      callType: callTypes.action,
      entities: auditLogData
    }));
  }, 1000);
};




export const fetchProducts = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.productsFetched({
      callType: callTypes.action,
      entities: data
    }));
  }, 1000);
  // dispatch(callGenericGetterAsync('/purchase', (res => {
    
  //   // if (res) {
  //   // }
  // })));
};