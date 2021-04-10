import { all } from 'redux-saga/effects';
import { watchAuth } from './auth/auth.sagas';
import { watchRole } from './role/role.sagas';
import { watchUser } from './user/user.sagas';
import { watchBrands } from './brand/brand.sagas';
import { watchCategories } from './category/category.sagas';
import { watchProducts } from './product/product.sagas';
import { watchPayments } from "./payment/payment.sagas";
import { watchQrcodes } from './qrcode/qrcode.sagas';
import { watchSpecs } from "./spec/spec.sagas";
import { watchSpecOptions } from "./spec/specOption.sagas";
import { watchOrders } from "./order/order.sagas";

export default function* rootSaga() {
  // const [auth, users, products, brands, categories] = 
  yield all([
    watchAuth(),
    watchRole(),
    watchUser(),
    watchBrands(),
    watchCategories(),
    watchProducts(),
    watchPayments(),
    watchOrders(),
    watchQrcodes(),
    watchSpecs(),
    watchSpecOptions()
  ]);
}
