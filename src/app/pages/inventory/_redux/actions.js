import {  callGenericAsync } from "app/generic/actions";
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

export const skuItemsFetched = id => dispatch => {
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
    if ( res?.PAR_ID === id ) {
      dispatch(actions.skuItemsFetched({
        callType: callTypes.action,
        entities: res?.Result[0]
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
      "method": "GetSupplierCode",
      "username": "admin",
      "password": "admin",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/InventoryWeb/GetSupplierCode', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getSupplier({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};

export const getChannels = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
        data : {
          "SEARCH"     	: "",
          "VOID_FLAG" 	: "",
          "ORDER"     	: "",
          "OFFSET"        : "",
          "RNUM_FROM"     : "",
          "RNUM_TO"       : "",
          "FINZ_FLAG"      : ""
          },
      "action": "InventoryWeb",
      "method": "GetChannels",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/InventoryWeb/GetChannels', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getChannels({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};

export const getProvince = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
        data : {
          "SEARCH"     	: "",
          "VOID_FLAG" 	: "",
          "ORDER"     	: "",
          "OFFSET"        : "",
          "RNUM_FROM"     : "",
          "RNUM_TO"       : "",
          "FINZ_FLAG"      : ""
          },
      "action": "InventoryWeb",
      "method": "GetProvinceState",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/InventoryWeb/GetProvinceState', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getProvince({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};

export const getCountry = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
        data : {
          "SEARCH"     	: "",
          "VOID_FLAG" 	: "",
          "ORDER"     	: "",
          "OFFSET"        : "",
          "RNUM_FROM"     : "",
          "RNUM_TO"       : "",
          "FINZ_FLAG"      : ""
          },
      "action": "InventoryWeb",
      "method": "GetCountryList",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/InventoryWeb/GetCountryList', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getCountry({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};

export const setSupplierSelected = (id) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(actions.setSelectedSupplier({
    callType: callTypes.action,
    entities: id
  }))
}

export const getCustomers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  const payload = {
        data : {
          "SEARCH"     	: "",
          "VOID_FLAG" 	: "",
          "ORDER"     	: "",
          "OFFSET"        : "",
          "RNUM_FROM"     : "",
          "RNUM_TO"       : "",
          "FINZ_FLAG"      : ""
          },
      "action": "InventoryWeb",
      "method": "GetSalesOrderList",
      "type": "rpc",
      "tid": "144"
  };

  dispatch(callGenericAsync(payload, '/InventoryWeb/GetCustomerGroups', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.getCustomers({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};