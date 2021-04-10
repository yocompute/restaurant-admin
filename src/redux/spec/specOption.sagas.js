import { put, call, takeLatest } from "redux-saga/effects";

import {
  FETCH_SPEC_OPTIONS,
  CREATE_SPEC_OPTION,
  UPDATE_SPEC_OPTION,
  fetchSpecOptionsSuccess,
  fetchSpecOptionsFail,
  createSpecOptionSuccess,
  updateSpecOptionSuccess,
} from "./specOption.actions";

import SpecOptionApi from "../../services/SpecOptionApi";
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchSpecOptions(action) {
  try {
    const { data, error, status } = yield call(SpecOptionApi.get, action.query);
    if (httpSuccess(status)) {
      yield put(fetchSpecOptionsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    yield put(fetchSpecOptionsFail(error));
  }
}

export function* createSpecOption(action) {
  try {
    const { data, error, status } = yield call(SpecOptionApi.create, action.data);
    yield put(createSpecOptionSuccess(data));
    if (httpSuccess(status)) {
      // const { data, error, status } = yield call(SpecOptionApi.get, null);
      // yield put(fetchSpecOptionsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateSpecOption(action) {
  try {
    const { data, error, status } = yield call(SpecOptionApi.update, action.data, action.id);
    yield put(updateSpecOptionSuccess(data));
    if (httpSuccess(status)) {
      // const { data, error, status } = yield call(SpecOptionApi.get, null);
      // yield put(fetchSpecOptionsSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchSpecOptions() {
  yield takeLatest(FETCH_SPEC_OPTIONS, fetchSpecOptions);
  yield takeLatest(CREATE_SPEC_OPTION, createSpecOption);
  yield takeLatest(UPDATE_SPEC_OPTION, updateSpecOption);
}
