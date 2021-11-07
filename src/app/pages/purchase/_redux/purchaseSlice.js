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
          "PURORDDET_ID": "",
          "PURORD_ID": "",
          "PAR_ID": "",
          "SEQ_NUMBER": 1,
          "PART_NUMBER": "",
          "PART_DESCRIPTION": "",
          "QUANTITY": 1,
          "UOM_ID_REORDERING": "",
          "REORDERING_UOM": "",
          "COST": "",
          "LAST_COST": "",
          "QTY_RECEIVED": "",
          "COLOR": null,
          "CATALOGUE_NUMBER": null,
          "STANDARD_COST": "",
          "QUARANTINE_FLAG": "Y",
          "LOT_NUMBER": null,
          "EXPIRY_DATE": null
        });
        return state;
      },
      deleteProduct: (state, action) => {
        state.entities.splice(state.entities.findIndex((entity) => entity.id === action.payload), 1);

        return state;
      },
      deletePurchaseListItem: (state, action) => {
        state.purchaseList.splice(state.purchaseList.findIndex((entity) => entity.id === action.payload), 1);

        return state;
      },
    }
  });
  