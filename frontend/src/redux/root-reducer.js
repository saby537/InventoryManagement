import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import productReducer from './Product/product.reducer';
import shopReducer from './Shop/shop.reducer';
import enterpriseReducer from './Enterprise/enterprise.reducer';
import stockReducer from './Stock/stock.reducer';
import userReducer from './user/user.reducer';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  product: productReducer,
  shop: shopReducer,
  enterprise: enterpriseReducer,
  stock: stockReducer,
  user: userReducer
});

export default persistReducer(persistConfig, rootReducer);