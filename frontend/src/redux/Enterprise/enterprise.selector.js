import { createSelector } from 'reselect';

const selectEnterprise = (state) => state.enterprise;

export const selectError = createSelector([selectEnterprise], (enterprise) => enterprise.error);

export const selectEnterpriseLoading = createSelector(
  [selectEnterprise],
  (enterprise) => enterprise.isLoading
);
export const selectEnterpriseStatus = createSelector(
  [selectEnterprise],
  (enterprise) => enterprise.success
);