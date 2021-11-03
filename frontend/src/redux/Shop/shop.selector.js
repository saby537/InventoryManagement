import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectError = createSelector([selectShop], (shop) => shop.error);

export const selectShopLoading = createSelector(
  [selectShop],
  (shop) => shop.isLoading
);
export const selectShopStatus = createSelector(
  [selectShop],
  (shop) => shop.success
);