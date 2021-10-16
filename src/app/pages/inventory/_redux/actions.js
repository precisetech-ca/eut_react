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

export const getPartsUom = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
      "data":{}, 
      "action": "ItemMaster",
      "method": "GetPartsUom",
      "username": "admin",
      "password": "admin",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/ItemMaster/GetPartsUom', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getPartsUomFetch({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};


export const getWarehouses = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
      "data":
      {  
        "SEARCH" : ""
      }, 
      "action": "InventoryWeb",
      "method": "GetWarehouse",
      "username": "admin",
      "password": "admin",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/InventoryWeb/GetWarehouse', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getWareHouse({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};

export const getSupplier = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
      "data":
      {  
        "SEARCH" : ""
      }, 
      "action": "InventoryWeb",
      "method": "GetWarehouse",
      "username": "admin",
      "password": "admin",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/InventoryWeb/GetWarehouse', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getSupplier({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};