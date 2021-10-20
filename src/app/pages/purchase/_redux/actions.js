import { callGenericGetterAsync } from "app/generic/actions";
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

  setTimeout(() => {
    dispatch(actions.purchaseListFetched({
      callType: callTypes.action,
      entities: purchaseData
    }));
  }, 1000);
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