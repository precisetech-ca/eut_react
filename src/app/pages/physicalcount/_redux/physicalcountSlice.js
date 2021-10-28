import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
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


export const physicalcountSlice = createSlice({
    name: "physicalcount",
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
      physicalcountListFetched : (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.physicalcountList = entities;
        state.totalCount = totalCount;
      },
      // findCustomers
      productsFetched: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        // entities.sub_total = Number(state.entities.odr_qty) * Number(state.entities.cost);
        state.entities = entities;
        state.totalCount = totalCount;
        const totalPrice = calculateSummary(state.entities);
        state.summary.amount = totalPrice;
        state.summary.tax_amount = Number((totalPrice * (state.summary.tax_perc/100)).toFixed(2));
        state.summary.total = state.summary.amount + state.summary.tax_amount;

        return state;
      },
      fullfilments: (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.fullfilments = entities;
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
            cost: 0,
            price:0,
            tax: [{id: 1, title: "13%"}],
            sub_total: "$00.00",
            po_num:" ",
        });

        return state;
      },
      deleteProduct: (state, action) => {
        state.entities.splice(state.entities.findIndex((entity) => entity.id === action.payload), 1);
        return state;
      },
      deletePartsReturnListItem: (state, action) => {
        state.physicalcountList.splice(state.physicalcountList.findIndex((entity) => entity.id === action.payload), 1);

        return state;
      },
    }
  });
  