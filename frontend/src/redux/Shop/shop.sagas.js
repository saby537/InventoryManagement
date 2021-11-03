import { takeLatest, takeEvery, call, all, put } from 'redux-saga/effects';
import { addWarehouseFailure, addWarehouseSuccess } from './shop.actions';
import shopActionTypes from './shop.types';

export function* addWarehouse({ payload }) {
  const httpAbortCtrl = new AbortController();
  try {
    const res = yield fetch(`${process.env.REACT_APP_API_URL}/api/warehouse/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      signal: httpAbortCtrl.signal,
    });
    const responseData = yield res.json();
    console.log(responseData);
    if (!res.ok) {
      yield put(addWarehouseFailure(responseData.errors));
    } else {
      yield put(addWarehouseSuccess());
    }
  } catch (err) {
    yield put(addWarehouseFailure([err]));
  }
  setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onAddWarehouse() {
  yield takeLatest(shopActionTypes.ADD_WAREHOUSE_START, addWarehouse);
}


export function* shopSagas() {
  yield all([call(onAddWarehouse)]);
}