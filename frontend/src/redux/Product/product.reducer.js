import productActionTypes from './product.types';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  success: false
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionTypes.ADD_STOCK_START:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case productActionTypes.ADD_STOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
      };
    case productActionTypes.EMPTY_ERROR:
      return {
        ...state,
        error: null,
        success: false,
      };
    case productActionTypes.ADD_STOCK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case productActionTypes.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default productReducer;