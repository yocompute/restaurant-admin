import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
  updateCategorySuccess,
  createCategorySuccess,
} from "./category.actions";
import CategoryApi from "../../services/CategoryApi";

import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchCategories(action) {
  try {
    const {data, error, status} = yield call(CategoryApi.get, action.query);
    if(httpSuccess(status)){
      yield put(fetchCategoriesSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
  } catch (error) {
    yield put(fetchCategoriesFail(error));
  }
}

export function* createCategory(action) {
  try {
    const {data, error, status} = yield call(CategoryApi.create, action.data);
    yield put(createCategorySuccess(data));
    if(httpSuccess(status)){
      // const {data, error, status} = yield call(CategoryApi.get, null);
      // yield put(fetchCategoriesSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateCategory(action) {
  try {
    const {data, error, status} = yield call(CategoryApi.update, action.data, action.id);
    if(httpSuccess(status)){
      yield put(updateCategorySuccess(data));
      // const {data, error, status} = yield call(CategoryApi.get, null);
      // yield put(fetchCategoriesSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchCategories() {
  yield takeLatest(FETCH_CATEGORIES, fetchCategories);
  yield takeLatest(CREATE_CATEGORY, createCategory);
  yield takeLatest(UPDATE_CATEGORY, updateCategory);
}
