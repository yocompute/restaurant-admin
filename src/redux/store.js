import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

import { authReducer } from './auth/auth.reducers';
import { usersReducer, userReducer } from './user/user.reducers';
import { brandsReducer, brandReducer } from './brand/brand.reducers';
import { categoriesReducer, categoryReducer, categoryMapReducer } from './category/category.reducers';
import { productsReducer, productReducer, additionsReducer, comboReducer } from './product/product.reducers';
import { cartReducer } from './cart/cart.reducers';
import { pageReducer } from './page/page.reducers';
import { paymentReducer, paymentsReducer } from './payment/payment.reducers';
import { qrcodeReducer, qrcodesReducer, qrcodeTagReducer } from './qrcode/qrcode.reducers';
import { specsReducer, specReducer } from './spec/spec.reducers';
import { notificationReducer } from './notification/notification.reducers';
import { roleReducer, rolesReducer } from './role/role.reducers';
import { orderReducer, ordersReducer, orderStatusReducer } from './order/order.reducers';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
  role: roleReducer,
  users: usersReducer,
  user: userReducer,
  brands: brandsReducer,
  brand: brandReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  categoryMap: categoryMapReducer,
  products: productsReducer,
  product: productReducer,
  combo: comboReducer,
  additions: additionsReducer,
  cart: cartReducer,
  page: pageReducer,
  payments: paymentsReducer,
  payment: paymentReducer,
  orders: ordersReducer,
  order: orderReducer,
  orderStatus: orderStatusReducer,
  qrcodes: qrcodesReducer,
  qrcode: qrcodeReducer,
  qrcodeTag: qrcodeTagReducer,
  specs: specsReducer,
  spec: specReducer,
  notification: notificationReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
