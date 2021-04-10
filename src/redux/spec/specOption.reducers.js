import {
    FETCH_SPEC_OPTIONS_SUCCESS,
    CREATE_SPEC_OPTION_SUCCESS,
    UPDATE_SPEC_OPTION_SUCCESS,
    SET_SPEC_OPTION,
  } from "./specOption.actions";
  
  export const specOptionsReducer = (state = null, action) => {
    if (action && action.type === FETCH_SPEC_OPTIONS_SUCCESS) {
      return [...action.specOptions];
    }
    return state;
  };
  
  export const specOptionReducer = (state = null, action) => {
    if (action && action.type === SET_SPEC_OPTION) {
      return { ...action.specOption };
    }
  
    if (action && action.type === CREATE_SPEC_OPTION_SUCCESS) {
      return { ...action.specOption };
    }
  
    if (action && action.type === UPDATE_SPEC_OPTION_SUCCESS) {
      return { ...action.specOption };
    }
  
    return state;
  };
  