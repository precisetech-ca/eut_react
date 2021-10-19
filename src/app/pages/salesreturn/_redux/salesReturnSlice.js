import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0, 
  customerForEdit: undefined,
  lastError: null,
  summary: {
    amount: "0.00",
    currency_symbol: "$",
    tax_amount: "0.00",
    tax_perc: 13,
    total: 0,
  }
};


export const callTypes = {
  list: "list",
  action: "action"
};


 
export const salesReturnSlice = createSlice({
    name: "salesreturn",
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
      salesreturnListFetched: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.salesReturnList = entities;
        state.totalCount = totalCount;
      },
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
      
      addProduct: (state , action) => {
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
            odr_qty: 0,
            return_qty: 0,
            price:0,
            tax: [{id: 1, title: "13%"}],
            sub_total: "$00.00",
        });

        return state;
      },

      deleteProduct: (state, action) => {
        state.entities.splice(state.entities.findIndex((entity) => entity.id === action.payload), 1);
        return state;
      },

      deleteSalesReturnListItem: (state, action) => {
        state.salesReturnList.splice(state.salesReturnList.findIndex((entity) => entity.id === action.payload), 1);

        return state;
      },
     
    }
  });
  