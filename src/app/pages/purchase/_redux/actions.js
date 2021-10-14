import { callGenericGetterAsync } from "app/generic/actions";
import { data, purchaseData, auditLogData } from "./mock/product.mock";
import { purchaseSlice, callTypes } from "./purchaseSlice";

export const addProduct = () => dispatch => {
  const { actions } = purchaseSlice;
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  const { actions } = purchaseSlice;
  dispatch(actions.deleteProduct(id));
}

export const deletePurchaseList = (id) => dispatch => {
  const { actions } = purchaseSlice;
  dispatch(actions.deletePurchaseListItem(id)); 
}


export const fetchPurchaseList = () => dispatch => {
  const { actions } = purchaseSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.purchaseListFetched({
      callType: callTypes.action,
      entities: purchaseData
    }));
  }, 1000);
};

export const auditLogDataAsync = () => dispatch => {
  const { actions } = purchaseSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.auditLogs({
      callType: callTypes.action,
      entities: auditLogData
    }));
  }, 1000);
};




export const fetchProducts = () => dispatch => {
  const { actions } = purchaseSlice;
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