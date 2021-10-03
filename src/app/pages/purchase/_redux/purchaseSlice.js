import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  customerForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};


export const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
      catchError: (state, action) => {
        state.error = `${action.type}: ${action.payload.error}`;
        if (action.payload.callType === callTypes.list) {
          state.listLoading = false;
        } else {
          state.actionsLoading = false;
        }
      },
      startCall: (state, action) => {
        state.error = null;
        if (action.payload.callType === callTypes.list) {
          state.listLoading = true;
        } else {
          state.actionsLoading = true;
        }
      },
      // getCustomerById
      productFetched: (state, action) => {
        state.actionsLoading = false;
        state.customerForEdit = action.payload.customerForEdit;
        state.error = null;
      },
      // findCustomers
      productsFetched: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.entities = entities;
        state.totalCount = totalCount;
      },
    }
  });
  