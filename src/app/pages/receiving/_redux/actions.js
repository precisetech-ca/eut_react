import { callGenericGetterAsync, callGenericAsync } from "app/generic/actions";
import { data, receivingData, auditLogData } from "./mock/table.mock";
import { receivingSlice, callTypes } from "./receivingSlice";
const { actions } = receivingSlice;

export const addProduct = () => dispatch => {
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  dispatch(actions.deleteProduct(id));
}

export const changeRecQty = ({qty, index}) => dispatch => {
  dispatch(actions.changeRecQty({qty, index}));
}
 
export const fetchReceivingList = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(callGenericAsync({
    "data": {
        "SEARCH"     	: "",
        "VOID_FLAG" 	: "",
        "ORDER"     	: "",
        "LOC_ID"     	: "",
        "OFFSET"        : "",
        "RNUM_FROM"     : "",
        "RNUM_TO"       : "",
        "FINZ_FLAG"      : ""
        },
    "action": "InventoryWeb",
    "method": "GetRecievingList",
    "type": "rpc",
    "tid": "144"
  }, '/InventoryWeb/GetRecievingList', "post", (res) => {
    if (res?.CODE === 'SUCCESS') {
      dispatch(actions.receivingListFetched({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
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


export const fetchProducts = (id) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  dispatch(callGenericAsync({
      "data": {
        "INVREC_ID" : id,
    },
    "action": "InventoryWeb",
    "method": "GetRecieving",
    "type": "rpc",
    "tid": "144"
  }, '/InventoryWeb/GetRecieving', "post", (res => {
    if (res) {
      dispatch(actions.productsFetched({
        callType: callTypes.action,
        entities: res?.Result[0]
      }));
    }
  })));
}; 