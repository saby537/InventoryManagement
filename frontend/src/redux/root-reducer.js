import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import productReducer from './Product/product.reducer';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  product: productReducer,
});

export default persistReducer(persistConfig, rootReducer);