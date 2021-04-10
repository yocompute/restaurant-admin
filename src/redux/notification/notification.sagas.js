import { put, call } from 'redux-saga/effects';
import { setNotification } from './notification.actions';


export function httpSuccess(status){
    return status < 300;
}

export function* processError(status){
    if(status >= 300 && status < 400) {
        yield put(setNotification('Server Error', status));
    }else if(status >=400 && status < 500){
        yield put(setNotification('Server Error', status));
    }else if(status >=500 && status < 600){
        yield put(setNotification('Server Error', status));
    }
}