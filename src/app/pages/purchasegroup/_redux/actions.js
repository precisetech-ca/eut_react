import { callGenericAsync } from "app/generic/actions";
import { data, purchasegroupData } from "./mock/product.mock";
import { purchasegroupSlice, callTypes } from "./purchasegroupSlice";
const { actions } = purchasegroupSlice;

export const addProduct = () => dispatch => {
  const { actions } = purchasegroupSlice;
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  const { actions } = purchasegroupSlice;
  dispatch(actions.deleteProduct(id));
}

export const deletePurchaseGroupList = (id) => dispatch => {
  const { actions } = purchasegroupSlice;
  dispatch(actions.deletePurchaseGroupListItem(id)); 
}

export const changeRecQty = ({qty, index}) => dispatch => {
  dispatch(actions.changeRecQty({qty , index}));
}

export const fetchPurchaseGroupList = () => dispatch => {
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
    dispatch(actions.purchasegroupListFetched({
      callType: callTypes.action,
      entities: res?.Result
    }));
  }
})));


};

export const fetchProducts = () => dispatch => {
  const { actions } = purchasegroupSlice;
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