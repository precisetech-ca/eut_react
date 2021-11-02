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

export const getChannels = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(callGenericAsync( {}, '/InventoryWeb/GetChannels', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.setChannels({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};

export const getState = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(callGenericAsync( {}, '/InventoryWeb/GetProvinceState', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.setState({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};


export const getCustomers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  dispatch(callGenericAsync( {}, '/InventoryWeb/GetCustomerGroups', 'post', (res) => {
    if ( res?.CODE === 'SUCCESS' ) {
      dispatch(actions.setCustomers({
        callType: callTypes.action,
        entities: res?.Result
      }));
    }
  }))
};