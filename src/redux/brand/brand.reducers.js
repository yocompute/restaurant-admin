import {
  FETCH_BRANDS_SUCCESS,
  CREATE_BRAND_SUCCESS,
  UPDATE_BRAND_SUCCESS,
  SET_BRAND,
} from "./brand.actions";

export const brandsReducer = (state = null, action) => {
  if (action && action.type === FETCH_BRANDS_SUCCESS) {
    return [...action.brands];
  }
  return state;
};

export const brandReducer = (state = null, action) => {
  if (action && action.type === SET_BRAND) {
    return { ...action.brand };
  }

  if (action && action.type === CREATE_BRAND_SUCCESS) {
    return { ...action.brand };
  }

  if (action && action.type === UPDATE_BRAND_SUCCESS) {
    return { ...action.brand };
  }

  return state;
};
