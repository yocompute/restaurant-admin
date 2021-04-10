import { put, call, takeLatest } from "redux-saga/effects";

import {
  FETCH_SPECS,
  CREATE_SPEC,
  UPDATE_SPEC,
  fetchSpecsSuccess,
  fetchSpecsFail,
  createSpecSuccess,
  updateSpecSuccess,
} from "./spec.actions";

import SpecApi from "../../services/SpecApi";
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchSpecs(action) {
  try {
    const { data, error, status } = yield call(SpecApi.get, action.query);
    if (httpSuccess(status)) {
      yield put(fetchSpecsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    yield put(fetchSpecsFail(error));
  }
}

export function* createSpec(action) {
  try {
    const { data, error, status } = yield call(SpecApi.create, action.data);
    yield put(createSpecSuccess(data));
    if (httpSuccess(status)) {
      // const { data, error, status } = yield call(SpecApi.get, null);
      // yield put(fetchSpecsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateSpec(action) {
  try {
    const { data, error, status } = yield call(SpecApi.update, action.data, action.id);
    yield put(updateSpecSuccess(data));
    if (httpSuccess(status)) {
      // const { data, error, status } = yield call(SpecApi.get, null);
      // yield put(fetchSpecsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchSpecs() {
  yield takeLatest(FETCH_SPECS, fetchSpecs);
  yield takeLatest(CREATE_SPEC, createSpec);
  yield takeLatest(UPDATE_SPEC, updateSpec);
}
