import stockActionTypes from './stock.types';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  success: false
};

const stockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case stockActionTypes.ADD_STOCK_START:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case stockActionTypes.ADD_STOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
      };
    case stockActionTypes.EMPTY_ERROR:
      return {
        ...state,
        error: null,
        success: false,
      };
    case stockActionTypes.ADD_STOCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case stockActionTypes.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default stockReducer;