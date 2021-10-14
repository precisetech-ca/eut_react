import {inventorySlice, callTypes} from "./inventorySlice";
import { table_data } from "./mock/inventory.mock";
const {actions} = inventorySlice;

export const inventoryItemsFetched = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  setTimeout(() => {
    dispatch(actions.inventoriesFetched({
      callType: callTypes.action,
      entities: table_data
    }));
  }, 1000);
};