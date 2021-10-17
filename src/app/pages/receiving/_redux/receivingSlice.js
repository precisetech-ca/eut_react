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

const calculateSummary = (products) => {
  return products.reduce((acc, current) => {
    acc += Number(current.sub_total);
    return acc;
  }, 0)
}

 
export const receivingSlice = createSlice({
    name: "receiving",
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
      summary: (state, action) => {

      },
      // getCustomerById
      productFetched: (state, action) => {
        state.actionsLoading = false;
        state.customerForEdit = action.payload.customerForEdit;
        state.error = null;
      },
      receivingListFetched: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.receivingList = entities;
        state.totalCount = totalCount;
      },
      // findCustomers
      productsFetched: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.products = entities;
        state.totalCount = totalCount;
      },
      auditLogs: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.auditLogs = entities;
        state.totalCount = totalCount;
      },
      changeRecQty: (state, action) => {
        const {payload} = action;
        const { cost } = state.products[payload.index];
        const subTotal = Number(payload.qty) * Number(cost);
        state.products[payload.index].rec_qty = Number(payload.qty);
        state.products[payload.index].sub_total = Number(subTotal).toFixed(2);
        const totalPrice = calculateSummary(state.products);
        state.summary.amount = totalPrice;
        state.summary.tax_amount = Number((totalPrice * (state.summary.tax_perc/100)).toFixed(2));
        state.summary.total = state.summary.amount + state.summary.tax_amount;
        
        return state;
      }
    }
  });
  