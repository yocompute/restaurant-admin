import { put, call, takeLatest } from "redux-saga/effects";

import {
  FETCH_BRANDS,
  CREATE_BRAND,
  UPDATE_BRAND,
  fetchBrandsSuccess,
  fetchBrandsFail,
  createBrandSuccess,
  updateBrandSuccess,
} from "./brand.actions";

import BrandApi from "../../services/BrandApi";
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchBrands(action) {
  try {
    const {data, error, status} = yield call(BrandApi.get, action.query);
    if(httpSuccess(status)){
      yield put(fetchBrandsSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }

  } catch (error) {
    yield put(fetchBrandsFail(error));
  }
}

export function* createBrand(action) {
  try {
    const {data, error, status} = yield call(BrandApi.create, action.data);
    yield put(createBrandSuccess(data));
    if(httpSuccess(status)){
      // const {data, error, status} = yield call(BrandApi.get, null);
      // yield put(fetchBrandsSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
    
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateBrand(action) {
  try {
    const {data, error, status} = yield call(BrandApi.update, action.data, action.id);
    yield put(updateBrandSuccess(data));
    if(httpSuccess(status)){
      // const {data, error, status} = yield call(BrandApi.get, null);
      // yield put(fetchBrandsSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchBrands() {
  yield takeLatest(FETCH_BRANDS, fetchBrands);
  yield takeLatest(CREATE_BRAND, createBrand);
  yield takeLatest(UPDATE_BRAND, updateBrand);
}
