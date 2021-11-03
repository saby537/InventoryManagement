import enterpriseActionTypes from './enterprise.types';

export const addEnterpriseStart = (enterprise) => ({
  type: enterpriseActionTypes.ADD_ENTERPRISE_START,
  payload: enterprise,
});
export const addEnterpriseSuccess = () => ({
  type: enterpriseActionTypes.ADD_ENTERPRISE_SUCCESS,
});
export const addEnterpriseFailure = (err) => ({
  type: enterpriseActionTypes.ADD_ENTERPRISE_FAILURE,
  payload: err,
});

export const emptyError = () => ({
  type: enterpriseActionTypes.EMPTY_ERROR,
});

export const resetSuccess = () => ({
  type: enterpriseActionTypes.RESET_SUCCESS,
});