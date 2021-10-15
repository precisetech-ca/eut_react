import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import {watcherGetterSaga, watcherSaga} from '../app/generic/sagas';
import { purchaseSlice } from "app/pages/purchase/_redux/purchaseSlice";
import { inventorySlice } from "app/pages/inventory/_redux/inventorySlice";
import { receivingSlice } from "app/pages/receiving/_redux/receivingSlice";
import { salesorderSlice } from "app/pages/salesorder/_redux/salesorderSlice";


export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  purchase: purchaseSlice.reducer,
  inventory: inventorySlice.reducer,
  receiving: receivingSlice.reducer,
  salesorder:salesorderSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer
});

export function* rootSaga() {
  yield all([
    auth.saga(),
    watcherGetterSaga(),
    watcherSaga()
  ]);
}
