import stockActionTypes from './stock.types';

export const addStockStart = (stock) => ({
  type: stockActionTypes.ADD_STOCK_START,
  payload: stock,
});
export const addStockSuccess = () => ({
  type: stockActionTypes.ADD_STOCK_SUCCESS,
});
export const addStockFailure = (err) => ({
  type: stockActionTypes.ADD_STOCK_FAILURE,
  payload: err,
});

export const emptyError = () => ({
  type: stockActionTypes.EMPTY_ERROR,
});

export const resetSuccess = () => ({
  type: stockActionTypes.RESET_SUCCESS,
});