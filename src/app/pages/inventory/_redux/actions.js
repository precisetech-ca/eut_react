import { callGenericGetterAsync } from "app/generic/actions";
import {inventorySlice, callTypes} from "./inventorySlice";
import { table_data } from "./mock/inventory.mock";
const {actions} = inventorySlice;

export const inventoryItemsFetched = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(callGenericGetterAsync('/ItemMaster/GetPartsList', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.inventoriesFetched({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};