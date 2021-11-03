import shopActionTypes from './shop.types';

export const addWarehouseStart = (warehouse) => ({
  type: shopActionTypes.ADD_WAREHOUSE_START,
  payload: warehouse,
});
export const addWarehouseSuccess = () => ({
  type: shopActionTypes.ADD_WAREHOUSE_SUCCESS,
});
export const addWarehouseFailure = (err) => ({
  type: shopActionTypes.ADD_WAREHOUSE_FAILURE,
  payload: err,
});

export const emptyError = () => ({
  type: shopActionTypes.EMPTY_ERROR,
});

export const resetSuccess = () => ({
  type: shopActionTypes.RESET_SUCCESS,
});