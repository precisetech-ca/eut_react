import { callGenericGetterAsync } from "app/generic/actions";
import { data, physicalcountData, fullfilmentData } from "./mock/product.mock";
import { physicalcountSlice, callTypes } from "./physicalcountSlice";
const { actions } = physicalcountSlice;

export const addProduct = () => dispatch => {
  const { actions } = physicalcountSlice;
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  const { actions } = physicalcountSlice;
  dispatch(actions.deleteProduct(id));
}

export const deletePhysicalCountList = (id) => dispatch => {
  const { actions } = physicalcountSlice;
  dispatch(actions.deletePhysicalCountListItem(id)); 
}

export const changeRecQty = ({qty, index}) => dispatch => {
  dispatch(actions.changeRecQty({qty , index}));
}

export const fetchPhysicalCountList = () => dispatch => {
  const { actions } = physicalcountSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.physicalcountListFetched({
      callType: callTypes.action,
      entities: physicalcountData
    }));
  }, 1000);
};

export const fullfilmentDataAsync = () => dispatch => {
  const { actions } = physicalcountSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.fullfilments({
      callType: callTypes.action,
      entities: fullfilmentData
    }));
  }, 1000);
};




export const fetchProducts = () => dispatch => {
  const { actions } = physicalcountSlice;
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