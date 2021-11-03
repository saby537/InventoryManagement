import shopActionTypes from './shop.types';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  success: false
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case shopActionTypes.ADD_WAREHOUSE_START:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case shopActionTypes.ADD_WAREHOUSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
      };
    case shopActionTypes.EMPTY_ERROR:
      return {
        ...state,
        error: null,
        success: false,
      };
    case shopActionTypes.ADD_WAREHOUSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case shopActionTypes.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default shopReducer;