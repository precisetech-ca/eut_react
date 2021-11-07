import {createSlice} from "@reduxjs/toolkit";

const inventoryInitialState = {
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

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: inventoryInitialState,
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
    inventoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.customerForEdit = action.payload.customerForEdit;
      state.error = null;
    },
    // findCustomers
    inventoriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.inventoryItems = entities;
      state.totalCount = 0;
    },
    getPartsUomFetch: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.uom = entities;
      state.totalCount = 0;
    },
    getWareHouse: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.warehouses = entities;
      state.totalCount = 0;
    },
    getSupplier: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.supplier = entities;
      state.totalCount = 0;
    },
    setSelectedSupplier: (state, action) => {
      const { entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      const selectedSupplier = state.supplier.map(s => {
        if (s.VEN_ID == entities) {
          s.selected = true;
        }else {
          s.selected = false;
        }

        return s;
      });

      state.supplier = selectedSupplier;

      state.totalCount = 0;
    }
  }
});
