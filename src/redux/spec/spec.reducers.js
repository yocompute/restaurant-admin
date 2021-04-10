import {
    FETCH_SPECS_SUCCESS,
    CREATE_SPEC_SUCCESS,
    UPDATE_SPEC_SUCCESS,
    SET_SPEC,
  } from "./spec.actions";
  
  export const specsReducer = (state = null, action) => {
    if (action && action.type === FETCH_SPECS_SUCCESS) {
      return [...action.specs];
    }
    return state;
  };
  
  export const specReducer = (state = null, action) => {
    if (action && action.type === SET_SPEC) {
      return { ...action.spec };
    }
  
    if (action && action.type === CREATE_SPEC_SUCCESS) {
      return { ...action.spec };
    }
  
    if (action && action.type === UPDATE_SPEC_SUCCESS) {
      return { ...action.spec };
    }
  
    return state;
  };
  