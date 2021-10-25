import productActionTypes from './product.types';

export const addStockStart = (stock) => ({
  type: productActionTypes.ADD_STOCK_START,
  payload: stock,
});
export const addStockSuccess = () => ({
  type: productActionTypes.ADD_STOCK_SUCCESS,
});
export const addStockFailure = (err) => ({
  type: productActionTypes.ADD_STOCK_FAILURE,
  payload: err,
});

export const emptyError = () => ({
  type: productActionTypes.EMPTY_ERROR,
});

export const resetSuccess = () => ({
  type: productActionTypes.RESET_SUCCESS,
});