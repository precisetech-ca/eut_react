import { callGenericAsync } from "app/generic/actions";
import { data, salesreturnData, auditLogData } from "./mock/product.mock";
import { salesReturnSlice, callTypes } from "./salesReturnSlice";

const {actions} = salesReturnSlice;

export const addProduct = () => dispatch => {
  const { actions } = salesReturnSlice;
  dispatch(actions.addProduct());
}
export const deleteProduct = (id) => dispatch => {
  const { actions } = salesReturnSlice;
  dispatch(actions.deleteProduct(id));
}

export const deleteSalesReturnList = (id) => dispatch => {
  dispatch(actions.deleteSalesReturnistItem(id)); 
}


export const fetchSalesReturnList = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const callPayload = {
        data: {
          "SEARCH"     	: "",
          "VOID_FLAG" 	: "",
          "ORDER"     	: "",
          "OFFSET"        : "",
          "RNUM_FROM"     : "",
          "RNUM_TO"       : "",
          "FINZ_FLAG"      : ""
          },
      "action": "InventoryWeb",
      "method": "GetSalesOrderList",
      "type": "rpc",
      "tid": "144" 
    };

    dispatch(callGenericAsync(callPayload, '/InventoryWeb/GetSaleOrderList', 'post', (res => {
    if (res?.CODE === 'SUCCESS') {
      dispatch(actions.salesreturnListFetched({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
    })));


};



export const auditLogDataAsync = () => dispatch => {
  const { actions } = salesReturnSlice;
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