// action types
export const FETCH_QRCODES = 'qrcode/FETCH_QRCODES';
export const FETCH_QRCODES_SUCCESS = 'qrcode/FETCH_QRCODES_SUCCESS';
export const FETCH_QRCODES_FAIL = 'qrcode/FETCH_QRCODES_FAIL';

export const CREATE_QRCODE = 'qrcode/CREATE_QRCODE';
export const CREATE_QRCODE_SUCCESS = 'qrcode/CREATE_QRCODE_SUCCESS';
export const CREATE_QRCODE_FAIL = 'qrcode/CREATE_QRCODE_FAIL';

export const UPDATE_QRCODE = 'qrcode/UPDATE_QRCODE';
export const UPDATE_QRCODE_SUCCESS = 'qrcode/UPDATE_QRCODE_SUCCESS';
export const UPDATE_QRCODE_FAIL = 'qrcode/UPDATE_QRCODE_FAIL';

export const SET_QRCODE = 'qrcode/SET_QRCODE';

export const SET_QRCODE_TAG = 'qrcode/SET_QRCODE_TAG';

// action creators
export const fetchQrcodes = (query) => ({
    type: FETCH_QRCODES,
    query
})

export const fetchQrcodesSuccess = (qrcodes = []) => ({
    type: FETCH_QRCODES_SUCCESS,
    qrcodes
})

export const fetchQrcodesFail = (error) => ({
    type: FETCH_QRCODES_FAIL,
    error
})


export const createQrcode = (data) => ({
    type: CREATE_QRCODE,
    data
})

export const createQrcodeSuccess = (qrcode) => ({
    type: CREATE_QRCODE_SUCCESS,
    qrcode
})

export const createQrcodeFail = error => ({
    type: CREATE_QRCODE_FAIL,
    error
})

export const updateQrcode = (data, id) => ({
    type: UPDATE_QRCODE,
    data,
    id,
})

export const updateQrcodeSuccess = (qrcode) => ({
    type: UPDATE_QRCODE_SUCCESS,
    qrcode
})

export const updateQrcodeFail = error => ({
    type: UPDATE_QRCODE_FAIL,
    error
})

export const setQrcode = (qrcode) => ({
    type: SET_QRCODE,
    qrcode
})

export const setQrcodeTag = (tag) => ({
    type: SET_QRCODE_TAG,
    tag
})