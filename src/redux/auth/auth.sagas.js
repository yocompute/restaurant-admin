import { put, call, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import AuthApi from '../../services/AuthApi';
import { cfg } from '../../config';
import { AppMode } from '../../const';

import { FETCH_AUTH, LOGIN, SIGNUP, LOGOUT,
    setAuth, fetchAuthSuccess, loginSuccess, signupSuccess, logoutSuccess } from './auth.actions';

import { setLoading } from '../page/page.actions';

import {JWT_COOKIE, JWT_EXPIRY} from '../../const';
import { setNotification } from '../notification/notification.actions';
import { httpSuccess } from '../notification/notification.sagas';


export function* fetchAuth() {
    try {
        const tokenId = Cookies.get(JWT_COOKIE);
        if(tokenId){
            const {data, error, status} = yield call(AuthApi.getUserByTokenId, tokenId);
            if(httpSuccess(status)){
                const user = data && data._id ? data : null;
                const token = data? tokenId : null;
                yield put(fetchAuthSuccess(token, user));
            }else{
                yield put(setNotification(error, status));
            }
        }else{
            yield put(fetchAuthSuccess(null, null));
        }
        yield put(setLoading(false));
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* login(action) {
    try {
        const {data, error, status} = yield call(AuthApi.login, action.data);
        const tokenId = data;

        Cookies.set(JWT_COOKIE, tokenId, { expires: JWT_EXPIRY });
        yield put(loginSuccess(tokenId));
        if(httpSuccess(status)){
            const {data, error, status} = yield call(AuthApi.getUserByTokenId, tokenId);
            const user = data && data._id ? data : null;
            const token = data? tokenId : null;
            yield put(setAuth(token, user));
        }else{
            yield put(setAuth(null, null));
            yield put(setNotification(error, status));
        }
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* signup(action) {
    try {
        const formData = action.data;
        const signupData = {username: formData.username, password: formData.password, email: formData.email};
        const {data, error, status} = yield call(AuthApi.signup, signupData);
        const tokenId = data;
        Cookies.set(JWT_COOKIE, tokenId, { expires: JWT_EXPIRY });
        if(httpSuccess(status)){
            yield put(signupSuccess(tokenId));
            const {data, error, status} = yield call(AuthApi.getUserByTokenId, tokenId);
            const user = data && data._id ? data : null;
            const token = data? tokenId : null;
            // if(user){
            //     const {data, error, status} = yield call(UserApi.update, {roles: [Role.Admin]}, user._id);
            //     user.roles = data.roles;

            //     yield call(createBrand, {data: {name: formData.brand, owner: user._id}});
            // }

            yield put(setAuth(token, user));
        }else{
            yield put(setAuth(null, null));
            yield put(setNotification(error, status));
        }
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}

export function* signupBrand(action) {
    try {
        const {data, error, status} = yield call(AuthApi.signupBrand, action.data);
        const tokenId = data;
        Cookies.set(JWT_COOKIE, tokenId, { expires: JWT_EXPIRY });
        if(httpSuccess(status)){
            yield put(signupSuccess(tokenId));
            const {data, error, status} = yield call(AuthApi.getUserByTokenId, tokenId);
            const user = data && data._id ? data : null;
            const token = data? tokenId : null;
            yield put(setAuth(token, user));
        }else{
            yield put(setAuth(null, null));
            yield put(setNotification(error, status));
        }
    } catch (error) {
        // yield put(addError({
        //     ...error
        // }))
    }
}


export function* logout(){
    Cookies.remove(JWT_COOKIE);
    yield put(logoutSuccess());
}

export function* watchAuth() {
    yield takeLatest(FETCH_AUTH, fetchAuth);
    yield takeLatest(LOGIN, login);
    yield takeLatest(SIGNUP, cfg.appMode === AppMode.PROD ? signupBrand : signup);
    yield takeLatest(LOGOUT, logout);
}