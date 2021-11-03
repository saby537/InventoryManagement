import { all, call } from 'redux-saga/effects';
import { enterpriseSagas } from './Enterprise/enterprise.sagas';
import { productSagas } from './Product/product.sagas';
import { shopSagas } from './Shop/shop.sagas';
import { stockSaga } from './Stock/stock.sagas';
export default function* rootSaga() {
  yield all([call(productSagas), call(shopSagas), call(enterpriseSagas), call(stockSaga)]);
}