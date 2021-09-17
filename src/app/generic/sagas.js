import { put, call, takeEvery } from 'redux-saga/effects';
import Api from '../utils/Api';
import * as genericAction from './actions';

function* workerSaga({ payload, callback, method, endpoint }) {
    try {
        const response = yield call(Api[method], endpoint, payload );
        if (typeof callback === "function") {
            callback(response.data);
        }
    } catch (error) {
        yield put({
            type: genericAction.CALL_GENERIC_SAGA_FAILED,
            payload: error
        });
    }
}

export function* watcherSaga() {
    yield takeEvery(genericAction.CALL_GENERIC_SAGA, workerSaga);
}



function* workerGetterSaga({ callback, endpoint }) {
    try {
        const response = yield call(Api.get, endpoint);

        if (typeof callback === "function") {
            callback(response.data);
        }
    } catch (error) {
        yield put({
            type: genericAction.CALL_GENERIC_GETTER_SAGA_FAILED,
            payload: error
        });
    }
}

export function* watcherGetterSaga() {
    yield takeEvery(genericAction.CALL_GENERIC_GETTER_SAGA, workerGetterSaga);
}