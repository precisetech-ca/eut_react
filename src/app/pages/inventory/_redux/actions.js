import { callGenericGetterAsync, callGenericAsync } from "app/generic/actions";
import {inventorySlice, callTypes} from "./inventorySlice";
import { table_data } from "./mock/inventory.mock";
const {actions} = inventorySlice;

export const inventoryItemsFetched = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
      "data":
      {  
        "OFFSET"		 : "+4:00",
        "ORDER"		 	 : "PAR_ID DESC",
        "ACTIVE_FLAG"	 : "Y",
        "RNUM_FROM"	     : "1",
        "RNUM_TO"		 : "100"
      }, 
      "action": "ItemMaster",
      "method": "GetPartsList",
      "username": "admin",
      "password": "admin",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/ItemMaster/GetPartsList', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.inventoriesFetched({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};