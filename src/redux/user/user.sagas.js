import { put, call, select, takeLatest } from 'redux-saga/effects'
import UserApi from '../../services/UserApi';
import {
    FETCH_USERS, CREATE_USER, UPDATE_USER,
    fetchUsersSuccess, createUserSuccess, updateUserSuccess
} from './user.actions'
import { httpSuccess } from '../notification/notification.sagas';
import { setNotification } from '../notification/notification.actions';

export function* fetchUsers(action) {
    try {
        const { data, error, status } = yield call(UserApi.get, action.query);

        if (httpSuccess(status)) {
            yield put(fetchUsersSuccess(data));
        } else {
            yield put(setNotification(error, 500));
        }

    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* createUser(action) {
    try {
        const { data, error, status } = yield call(UserApi.create, action.data);
        yield put(createUserSuccess(data));

        if (httpSuccess(status)) {
            // const { data, error, status } = yield call(UserApi.get, null);
            // yield put(fetchUsersSuccess(data));
        } else {
            yield put(setNotification(error, status));
        }
    } catch (error) {
        yield put(setNotification(error, 500));
    }
}

export function* updateUser(action) {
    try {
        const { data, error, status } = yield call(UserApi.update, action.data, action.id);
        yield put(updateUserSuccess(data));
        if (httpSuccess(status)) {
            // const { data, error, status } = yield call(UserApi.get, null);
            // yield put(fetchUsersSuccess(data));
        } else {
            yield put(setNotification(error, status));
        }
    } catch (error) {
        yield put(setNotification(error, 500));
    }
}

export function* watchUser() {
    yield takeLatest(FETCH_USERS, fetchUsers);
    yield takeLatest(CREATE_USER, createUser);
    yield takeLatest(UPDATE_USER, updateUser);
}