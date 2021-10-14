import { callGenericGetterAsync } from "app/generic/actions";
import { data, receivingData, auditLogData } from "./mock/table.mock";
import { receivingSlice, callTypes } from "./receivingSlice";

export const addProduct = () => dispatch => {
  const { actions } = receivingSlice;
  dispatch(actions.addProduct());
}

export const deleteProduct = (id) => dispatch => {
  const { actions } = receivingSlice;
  dispatch(actions.deleteProduct(id));
}


export const fetchReceivingList = () => dispatch => {
  const { actions } = receivingSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.receivingListFetched({
      callType: callTypes.action,
      entities: receivingData
    }));
  }, 1000);
};

export const auditLogDataAsync = () => dispatch => {
  const { actions } = receivingSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.auditLogs({
      callType: callTypes.action,
      entities: auditLogData
    }));
  }, 1000);
};


export const fetchProducts = () => dispatch => {
  const { actions } = receivingSlice;
  dispatch(actions.startCall({ callType: callTypes.action }));

  setTimeout(() => {
    dispatch(actions.productsFetched({
      callType: callTypes.action,
      entities: data
    }));
  }, 1000);
};