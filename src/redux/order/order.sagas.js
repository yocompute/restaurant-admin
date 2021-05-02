import { put, call, takeLatest } from "redux-saga/effects";

import {
  FETCH_ORDERS,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  fetchOrdersSuccess,
  fetchOrdersFail,
  createOrderSuccess,
  updateOrderSuccess,
  deleteOrderSuccess,
} from "./order.actions";

import OrderApi from "../../services/OrderApi";
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchOrders(action) {
  try {
    const {data, error, status} = yield call(OrderApi.get, action.query);
    if(httpSuccess(status)){
      yield put(fetchOrdersSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }

  } catch (error) {
    yield put(fetchOrdersFail(error));
  }
}

export function* createOrder(action) {
  try {
    const {data, error, status} = yield call(OrderApi.create, action.data);
    yield put(createOrderSuccess(data));
    if(httpSuccess(status)){
      // const {data, error, status} = yield call(OrderApi.get, null);
      // yield put(fetchOrdersSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
    
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* updateOrder(action) {
  try {
    const {data, error, status} = yield call(OrderApi.update, action.data, action.id);
    yield put(updateOrderSuccess(data));
    if(httpSuccess(status)){
      // const {data, error, status} = yield call(OrderApi.get, null);
      // yield put(fetchOrdersSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* deleteOrder(action) {
  try {
    const {data, error, status} = yield call(OrderApi.delete, action.id);
    yield put(deleteOrderSuccess(data));
    if(httpSuccess(status)){
      // const {data, error, status} = yield call(OrderApi.get, null);
      // yield put(fetchOrdersSuccess(data));
    }else{
      yield put(setNotification(error, status));
    }
  } catch (error) {
    // yield put(addError({
    //     ...error
    // }))
  }
}

export function* watchOrders() {
  yield takeLatest(FETCH_ORDERS, fetchOrders);
  yield takeLatest(CREATE_ORDER, createOrder);
  yield takeLatest(UPDATE_ORDER, updateOrder);
  yield takeLatest(DELETE_ORDER, deleteOrder);
}
