import {  callGenericAsync } from "app/generic/actions";
import {defaultSlice, callTypes} from "./DefaultReducer";
const {actions} = defaultSlice;



export const getCountry = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(callGenericAsync( {}, '/InventoryWeb/GetCountryList', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.setCountry({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};


export const getCustomers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(callGenericAsync( {}, '/InventoryWeb/GetCustomer', 'post', (res) => {
    if ( res ) {
      dispatch(actions.setCustomers({
        callType: callTypes.action,
        entities: res
      }));
    }
  }))
};

export const getCustomerGroups = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));

    dispatch(callGenericAsync( {} , '/InventoryWeb/GetCustomerGroups', 'post', (res) => {
      if ( res?.CODE === 'SUCCESS' ) {
        dispatch(actions.setCustomerGroups({
          callType: callTypes.action,
          entities: res?.Result
        }));
      }
    }))
  };