import { QrcodeTag } from "../../const";
import {
  FETCH_QRCODES_SUCCESS,
  CREATE_QRCODE_SUCCESS,
  UPDATE_QRCODE_SUCCESS,
  SET_QRCODE,
  SET_QRCODE_TAG,
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

export const qrcodeTagReducer = (state = QrcodeTag.Dine, action) => {
  if (action && action.type === SET_QRCODE_TAG) {
    return action.tag;
  }
  return state;
};