import { takeLatest, call, all, put } from 'redux-saga/effects';
import { addStockFailure, addStockSuccess } from './product.actions';
import productActionTypes from './product.types';

export function* addStock({ payload }) {
  const httpAbortCtrl = new AbortController();
  try {
    const res = yield fetch(`${process.env.REACT_APP_API_URL}/api/item`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      signal: httpAbortCtrl.signal,
    });
    const responseData = yield res.json();
    if (!res.ok) {
      yield put(addStockFailure(responseData.errors));
    } else {
      yield put(addStockSuccess());
    }
  } catch (err) {
    yield put(addStockFailure([err]));
  }
  setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onAddStock() {
  yield takeLatest(productActionTypes.ADD_STOCK_START, addStock);
}


export function* productSagas() {
  yield all([call(onAddStock)]);
}