import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  customerForEdit: undefined,
  lastError: null,
  purchaseDetails: []
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

      purchaseDetailsFetched : (state, action) => {
        const { totalCount, entities } = action.payload;
        state.listLoading = false;
        state.error = null;
        state.purchaseDetails = entities;
        state.totalCount = totalCount;
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
        state.entitiesLength = state.entities.length;
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
        state.purchaseDetails.push({
          RNUM: 10,
          TOTALROW: 10,
          PAR_ID: "",
          PAR_CODE: '',
          SKU: '',
          BARCODE_NUMBER: '',
          DESCRIPTION: '',
          PARGRO_ID: null,
          STOCK_ITEM_FLAG: 'Y',
          ACTIVE_FLAG: 'Y',
          AVERAGE_COST: "0.00",
          STANDARD_COST: "0.00",
          WARRANTY: "0",
          NAME: null,
          LOT_NUMBER: null,
          BATCH_EXPIRY: null,
          QUARANTINE: "N",
          DimensionL: '0',
          DimensionH: '0',
          DimensionW: '0',
          Weight: '0',
          CONVERSION_INTO_STOCKING_UOM: "0",
          PAR_ID_SUPERCEDES: null,
          UOM_ID_REORDERING: "0",
          ALLOW_NEGATIVE_FLAG: 'Y',
          SUPPLIER: '',
          TCL_PART: null
        });
        return state;
      },
      changeProduct: (state, action) => {
        const {object, index} = action.payload.data;
        state.purchaseDetails[index] = object;
        return state;
      },
      deleteProduct: (state, action) => {
        state.purchaseDetails.splice(state.entities.findIndex((entity) => entity.id === action.payload), 1);

        return state;
      },
      deletePurchaseListItem: (state, action) => {
        state.purchaseList.splice(state.purchaseList.findIndex((entity) => entity.id === action.payload), 1);

        return state;
      },
    }
  });
  