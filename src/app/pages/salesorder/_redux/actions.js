import { callGenericGetterAsync } from "app/generic/actions";
import { data, salesorderData, auditLogData } from "./mock/product.mock";
import { salesorderSlice, callTypes } from "./salesorderSlice";

export const addProduct = () => dispatch => {
  const { actions } = salesorderSlice;
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  const { actions } = salesorderSlice;
  dispatch(actions.deleteProduct(id));
}

export const deleteSalesOrderList = (id) => dispatch => {
  const { actions } = salesorderSlice;
  dispatch(actions.deleteSalesOrderistItem(id)); 
}


export const fetchSalesOrderList = () => dispatch => {
  const { actions } = salesorderSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.salesorderListFetched({
      callType: callTypes.action,
      entities: salesorderData
    }));
  }, 1000);
};

export const auditLogDataAsync = () => dispatch => {
  const { actions } = salesorderSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.auditLogs({
      callType: callTypes.action,
      entities: auditLogData
    }));
  }, 1000);
};




export const fetchProducts = () => dispatch => {
  const { actions } = salesorderSlice;
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