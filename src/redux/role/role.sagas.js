import { put, call, select, takeLatest } from 'redux-saga/effects';
import RoleApi from '../../services/RoleApi';
import {
    FETCH_ROLES, CREATE_ROLE, UPDATE_ROLE,
    fetchRolesSuccess, createRoleSuccess, updateRoleSuccess
} from './role.actions';

import { httpSuccess } from '../notification/notification.sagas';
import { setNotification } from '../notification/notification.actions';

export function* fetchRoles(action) {
    try {
        const { data, error, status } = yield call(RoleApi.get, action.query);

        if (httpSuccess(status)) {
            yield put(fetchRolesSuccess(data));
        } else {
            yield put(setNotification(error, 500));
        }

    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* createRole(action) {
    try {
        const { data, error, status } = yield call(RoleApi.create, action.data);
        yield put(createRoleSuccess(data));

        if (httpSuccess(status)) {
            // const { data, error, status } = yield call(RoleApi.get, null);
            // yield put(fetchRolesSuccess(data));
        } else {
            yield put(setNotification(error, status));
        }
    } catch (error) {
        yield put(setNotification(error, 500));
    }
}

export function* updateRole(action) {
    try {
        const { data, error, status } = yield call(RoleApi.update, action.data, action.id);
        yield put(updateRoleSuccess(data));
        if (httpSuccess(status)) {
            // const { data, error, status } = yield call(RoleApi.get, null);
            // yield put(fetchRolesSuccess(data));
        } else {
            yield put(setNotification(error, status));
        }
    } catch (error) {
        yield put(setNotification(error, 500));
    }
}

export function* watchRole() {
    yield takeLatest(FETCH_ROLES, fetchRoles);
    yield takeLatest(CREATE_ROLE, createRole);
    yield takeLatest(UPDATE_ROLE, updateRole);
}