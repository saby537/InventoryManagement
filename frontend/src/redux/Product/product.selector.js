import { createSelector } from 'reselect';

const selectProduct = (state) => state.product;

export const selectError = createSelector([selectProduct], (product) => product.error);

export const selectProductLoading = createSelector(
  [selectProduct],
  (product) => product.isLoading
);
export const selectProductStatus = createSelector(
  [selectProduct],
  (product) => product.success
);