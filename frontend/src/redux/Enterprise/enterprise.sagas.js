import { takeLatest, call, all, put } from 'redux-saga/effects';
import { addEnterpriseFailure, addEnterpriseSuccess } from './enterprise.actions';
import enterpriseActionTypes from './enterprise.types';

export function* addEnterprise({ payload }) {
  const httpAbortCtrl = new AbortController();
  try {
    const res = yield fetch(`${process.env.REACT_APP_API_URL}/api/enterprise/`, {
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
      yield put(addEnterpriseFailure(responseData.errors));
    } else {
      yield put(addEnterpriseSuccess());
    }
  } catch (err) {
    yield put(addEnterpriseFailure([err]));
  }
  setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onAddEnterprise() {
  yield takeLatest(enterpriseActionTypes.ADD_ENTERPRISE_START, addEnterprise);
}


export function* enterpriseSagas() {
  yield all([call(onAddEnterprise)]);
}