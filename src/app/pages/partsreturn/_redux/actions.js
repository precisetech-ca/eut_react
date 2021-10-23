import { callGenericGetterAsync } from "app/generic/actions";
import { data, partsreturnData, fullfilmentData } from "./mock/product.mock";
import { partsreturnSlice, callTypes } from "./partsreturnSlice";
const { actions } = partsreturnSlice;

export const addProduct = () => dispatch => {
  const { actions } = partsreturnSlice;
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  const { actions } = partsreturnSlice;
  dispatch(actions.deleteProduct(id));
}

export const deletePartsReturnList = (id) => dispatch => {
  const { actions } = partsreturnSlice;
  dispatch(actions.deletePartsReturnListItem(id)); 
}

export const changeRecQty = ({qty, index}) => dispatch => {
  dispatch(actions.changeRecQty({qty , index}));
}

export const fetchPartsReturnList = () => dispatch => {
  const { actions } = partsreturnSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.partsreturnListFetched({
      callType: callTypes.action,
      entities: partsreturnData
    }));
  }, 1000);
};

export const fullfilmentDataAsync = () => dispatch => {
  const { actions } = partsreturnSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.fullfilments({
      callType: callTypes.action,
      entities: fullfilmentData
    }));
  }, 1000);
};




export const fetchProducts = () => dispatch => {
  const { actions } = partsreturnSlice;
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