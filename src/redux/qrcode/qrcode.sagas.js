import { put, call, takeLatest } from "redux-saga/effects";

import {
  FETCH_QRCODES,
  CREATE_QRCODE,
  UPDATE_QRCODE,
  fetchQrcodesSuccess,
  fetchQrcodesFail,
  createQrcodeSuccess,
  updateQrcodeSuccess,
} from "./qrcode.actions";

import QrcodeApi from "../../services/QrcodeApi";
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchQrcodes(action) {
  try {
    const { data, error, status } =  yield call(QrcodeApi.get, action.query);
    if (httpSuccess(status)) {
      yield put(fetchQrcodesSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    yield put(fetchQrcodesFail(error));
  }
}

export function* createQrcode(action) {
  try {
    const { data, error, status } =  yield call(QrcodeApi.create, action.data);
    yield put(createQrcodeSuccess(data));
    if (httpSuccess(status)) {
      // const { data, error, status } =  yield call(QrcodeApi.get, null);
      // yield put(fetchQrcodesSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateQrcode(action) {
  try {
    const { data, error, status } =  yield call(QrcodeApi.update, action.data, action.id);
    yield put(updateQrcodeSuccess(data));
    if (httpSuccess(status)) {
      // const { data, error, status } =  yield call(QrcodeApi.get, null);
      // yield put(fetchQrcodesSuccess(data));
    } else {
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchQrcodes() {
  yield takeLatest(FETCH_QRCODES, fetchQrcodes);
  yield takeLatest(CREATE_QRCODE, createQrcode);
  yield takeLatest(UPDATE_QRCODE, updateQrcode);
}
