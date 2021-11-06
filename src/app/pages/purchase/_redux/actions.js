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
    data: {
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

export const auditLogDataAsync = (id, useId, username) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  const getDataPayload = {
    data:
      {    
        "SOURCEORASEQ"	: id,     
        "USE_ID"        : useId,
        "USER_NAME"     : username,
        "OFFSET" 			  : "+04:00",
        "RNUM_FROM"     : "1",
        "RNUM_TO" 			: "100"
      },
    "action": "FieldOrderWeb",
    "method": "GetAuditLog",
    "type": "rpc",
    "tid": "144"
  };

  dispatch(callGenericAsync(getDataPayload, "/InventoryWeb/GetAuditLog", "post", (res) => {
    if (res?.CODE === "SUCCESS") {
      dispatch(actions.auditLogs({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};

export const fetchProducts = (id) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  dispatch(callGenericAsync({
      "data": {
          "PURORD_ID" : id
      },
      "action": "InventoryWeb",
      "method": "GetPurchaseOrder",
      "type": "rpc",
      "tid": "144"
  }, '/InventoryWeb/GetPurchaseOrder', "post", (res => {
    if (res) {
      dispatch(actions.productsFetched({
        callType: callTypes.action,
        entities: res?.Result?.INV_PURCHASE_ORDER_DETAILS_WV
      }));
    }
  })));
};