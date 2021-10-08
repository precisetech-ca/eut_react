import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

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
      purchaseListFetched : (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.purchaseList = entities;
        state.totalCount = totalCount;
      },
      // findCustomers
      productsFetched: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.entities = entities;
        state.totalCount = totalCount;
      },
      auditLogs: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.auditLogs = entities;
        state.totalCount = totalCount;
      },
      addProduct: (state, action) => {
        state.entities.push({
            id: uuidv4(),
            sku: [
                {id: "AKC-132123", value: "AKC-132123"},
                {id: "AKUC-4121", value: "AKUC-4121"},
            ],
            barcode: "",
            desc: "",
            lot_no: "",
            expiry: "",
            oh_qty: 0,
            available_qty: 0,
            odr_qty: 0,
            uom: "Each",
            cost: 0,
            tax: [{id: 1, title: "13%"}],
            last_cost: 0,
            sub_total: "$00.00"
        });

        return state;
      },
      deleteProduct: (state, action) => {
        state.entities.splice(state.entities.findIndex((entity) => entity.id === action.payload), 1);

        return state;
      }
    }
  });
  