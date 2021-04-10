import { put, call, takeLatest } from "redux-saga/effects";

import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_ADDITIONS,
  fetchProductsSuccess,
  fetchProductsFail,
  fetchAdditionsSuccess,
  fetchAdditionsFail,
  createProductSuccess,
  updateProductSuccess,
} from "./product.actions";

import ProductApi from "../../services/ProductApi";
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchProducts(action) {
  try {
    const { data, error, status } = yield call(ProductApi.get, action.query);
    if (httpSuccess(status)) {
      yield put(fetchProductsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    yield put(fetchProductsFail(error));
  }
}

export function* createProduct(action) {
  try {
    const { data, error, status } = yield call(ProductApi.create, action.data);
    yield put(createProductSuccess(data));
    if (httpSuccess(status)) {
      // const { data, error, status } = yield call(ProductApi.get, null);
      // yield put(fetchProductsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateProduct(action) {
  try {
    const { data, error, status } = yield call(ProductApi.update, action.data, action.id);
    yield put(updateProductSuccess(data));
    if (httpSuccess(status)) {  
      // const { data, error, status } = yield call(ProductApi.get, null);
      // yield put(fetchProductsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

// Restaurant related

export function* fetchAdditions(action) {
  try {
    const { data, error, status } = yield call(ProductApi.get, { ...action.query, type: 'A' });
    if (httpSuccess(status)) {
      yield put(fetchAdditionsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    yield put(fetchAdditionsFail(error));
  }
}

export function* watchProducts() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
  yield takeLatest(CREATE_PRODUCT, createProduct);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
  yield takeLatest(FETCH_ADDITIONS, fetchAdditions);
}
