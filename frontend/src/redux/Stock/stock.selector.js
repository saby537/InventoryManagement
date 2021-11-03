import { createSelector } from 'reselect';

const selectStock = (state) => state.stock;

export const selectError = createSelector([selectStock], (stock) => stock.error);

export const selectStockLoading = createSelector(
  [selectStock],
  (stock) => stock.isLoading
);
export const selectStockStatus = createSelector(
  [selectStock],
  (stock) => stock.success
);