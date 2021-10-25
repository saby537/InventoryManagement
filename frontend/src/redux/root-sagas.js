import { all, call } from 'redux-saga/effects';
import { productSagas } from './Product/product.sagas';
export default function* rootSaga() {
  yield all([call(productSagas)]);
}