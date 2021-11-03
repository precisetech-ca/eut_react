import { callGenericAsync, callGenericGetterAsync } from "app/generic/actions";
import { data, salesorderData, fullfilmentData } from "./mock/product.mock";
import { salesorderSlice, callTypes } from "./salesorderSlice";
const { actions } = salesorderSlice;

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

export const changeRecQty = ({qty, index}) => dispatch => {
  dispatch(actions.changeRecQty({qty , index}));
}

export const fetchSalesOrderList = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const callPayload = {
    "data": {
      "SALEORD_ID": "118548",
      "OFFSET" : "+5:00"
    },
    "action": "InventoryWeb",
    "method": "GetSaleOrder",
    "type": "rpc",
    "tid": "144"
  
  };
  
  dispatch(callGenericAsync(callPayload, '/InventoryWeb/GetSaleOrder', 'post', (res => {
    if (res?.CODE === 'SUCCESS') {
      dispatch(actions.salesorderListFetched({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  })));
  
};

export const fullfilmentDataAsync = () => dispatch => {
  const { actions } = salesorderSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.fullfilments({
      callType: callTypes.action,
      entities: fullfilmentData
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