import { put, call, takeLatest } from 'redux-saga/effects'

import {
    FETCH_PAYMENTS, CREATE_PAYMENT, UPDATE_PAYMENT,
    fetchPaymentsSuccess, fetchPaymentsFail, createPaymentSuccess, updatePaymentSuccess
} from './payment.actions'

import PaymentApi from '../../services/PaymentApi';
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';

export function* fetchPayments(action) {
    try {
        const { data, error, status } = yield call(PaymentApi.get, action.query);
        if (httpSuccess(status)) {
            yield put(fetchPaymentsSuccess(data));
        } else {
            yield put(setNotification(error, status));
        }
    } catch (error) {
        yield put(fetchPaymentsFail(error));
    }
}

export function* createPayment(action) {
    try {
        const { data, error, status } = yield call(PaymentApi.create, action.data);
        yield put(createPaymentSuccess(data));
        if (httpSuccess(status)) {
            // const { data, error, status } = yield call(PaymentApi.get, null);
            // yield put(fetchPaymentsSuccess(data));
        } else {
            yield put(setNotification(error, status));
        }
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* updatePayment(action) {
    try {
        const { data, error, status } = yield call(PaymentApi.update, action.data);
        if (httpSuccess(status)) {
            yield put(updatePaymentSuccess(data));
        } else {
            yield put(setNotification(error, status));
        }

    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* watchPayments() {
    yield takeLatest(FETCH_PAYMENTS, fetchPayments);
    yield takeLatest(CREATE_PAYMENT, createPayment);
    yield takeLatest(UPDATE_PAYMENT, updatePayment);
}