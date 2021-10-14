import { callGenericGetterAsync } from "app/generic/actions";
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

  setTimeout(() => {
    dispatch(actions.receivingListFetched({
      callType: callTypes.action,
      entities: receivingData
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
};