import { callGenericGetterAsync } from "app/generic/actions";
import { data, salesorderData, fullfilmentData } from "./mock/product.mock";
import { salesReturnSlice, callTypes } from "./salesReturnSlice";

const {actions} = salesReturnSlice;

export const addProduct = () => dispatch => {
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  dispatch(actions.deleteProduct(id));
}

export const deleteSalesOrderList = (id) => dispatch => {
  dispatch(actions.deleteSalesOrderistItem(id)); 
}


export const fetchSalesOrderList = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.salesorderListFetched({
      callType: callTypes.action,
      entities: salesorderData
    }));
  }, 1000);
};

export const fullfilmentDataAsync = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.fullfilments({
      callType: callTypes.action,
      entities: fullfilmentData
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