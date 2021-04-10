// action types
export const FETCH_SPECS = "spec/FETCH_SPECS";
export const FETCH_SPECS_SUCCESS = "spec/FETCH_SPECS_SUCCESS";
export const FETCH_SPECS_FAIL = "spec/FETCH_SPECS_FAIL";

export const CREATE_SPEC = "spec/CREATE_SPEC";
export const CREATE_SPEC_SUCCESS = "spec/CREATE_SPEC_SUCCESS";
export const CREATE_SPEC_FAIL = "spec/CREATE_SPEC_FAIL";

export const UPDATE_SPEC = "spec/UPDATE_SPEC";
export const UPDATE_SPEC_SUCCESS = "spec/UPDATE_SPEC_SUCCESS";
export const UPDATE_SPEC_FAIL = "spec/UPDATE_SPEC_FAIL";

export const SET_SPEC = "spec/SET_SPEC";

// action creators
export const fetchSpecs = (query) => ({
  type: FETCH_SPECS,
  query
});

export const fetchSpecsSuccess = (specs = []) => ({
  type: FETCH_SPECS_SUCCESS,
  specs,
});

export const fetchSpecsFail = (error) => ({
  type: FETCH_SPECS_FAIL,
  error,
});

export const createSpec = (data) => ({
  type: CREATE_SPEC,
  data,
});

export const createSpecSuccess = (spec) => ({
  type: CREATE_SPEC_SUCCESS,
  spec,
});

export const createSpecFail = (error) => ({
  type: CREATE_SPEC_FAIL,
  error,
});

export const updateSpec = (data, id) => ({
  type: UPDATE_SPEC,
  data,
  id,
});

export const updateSpecSuccess = (spec) => ({
  type: UPDATE_SPEC_SUCCESS,
  spec,
});

export const updateSpecFail = (error) => ({
  type: UPDATE_SPEC_FAIL,
  error,
});

export const setSpec = (spec) => ({
  type: SET_SPEC,
  spec,
});
