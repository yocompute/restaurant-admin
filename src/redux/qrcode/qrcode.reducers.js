import {
  FETCH_QRCODES_SUCCESS,
  CREATE_QRCODE_SUCCESS,
  UPDATE_QRCODE_SUCCESS,
  SET_QRCODE,
} from "./qrcode.actions";

export const qrcodesReducer = (state = null, action) => {
  if (action && action.type === FETCH_QRCODES_SUCCESS) {
    return [...action.qrcodes];
  }
  return state;
};

export const qrcodeReducer = (state = null, action) => {
  if (action && action.type === SET_QRCODE) {
    return { ...action.qrcode };
  }

  if (action && action.type === CREATE_QRCODE_SUCCESS) {
    return { ...action.qrcode };
  }

  if (action && action.type === UPDATE_QRCODE_SUCCESS) {
    return { ...action.qrcode };
  }

  return state;
};
