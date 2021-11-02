import {createSlice} from "@reduxjs/toolkit";

const defaultInitialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  lastError: null
};
export const callTypes = {
  list: "default",
  action: "action"
};

export const defaultSlice = createSlice({
  name: "default",
  initialState: defaultInitialState,
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
    
    setCustomers: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.customers = entities;
      state.totalCount = 0;
    },

    setCountry: (state, action) => {
        const { entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.country = entities;
        state.totalCount = 0;
      },

    setCustomerGroups: (state, action) => {
        const { entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.customerGroups = entities;
        state.totalCount = 0;
    },
  }
});
