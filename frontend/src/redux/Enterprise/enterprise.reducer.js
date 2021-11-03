import enterpriseActionTypes from './enterprise.types';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  success: false
};

const enterpriseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case enterpriseActionTypes.ADD_ENTERPRISE_START:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case enterpriseActionTypes.ADD_ENTERPRISE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
      };
    case enterpriseActionTypes.EMPTY_ERROR:
      return {
        ...state,
        error: null,
        success: false,
      };
    case enterpriseActionTypes.ADD_ENTERPRISE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case enterpriseActionTypes.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default enterpriseReducer;