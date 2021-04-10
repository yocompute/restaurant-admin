// action types
export const FETCH_SPEC_OPTIONS = "specOption/FETCH_SPEC_OPTIONS";
export const FETCH_SPEC_OPTIONS_SUCCESS = "specOption/FETCH_SPEC_OPTIONS_SUCCESS";
export const FETCH_SPEC_OPTIONS_FAIL = "specOption/FETCH_SPEC_OPTIONS_FAIL";

export const CREATE_SPEC_OPTION = "specOption/CREATE_SPEC_OPTION";
export const CREATE_SPEC_OPTION_SUCCESS = "specOption/CREATE_SPEC_OPTION_SUCCESS";
export const CREATE_SPEC_OPTION_FAIL = "specOption/CREATE_SPEC_OPTION_FAIL";

export const UPDATE_SPEC_OPTION = "specOption/UPDATE_SPEC_OPTION";
export const UPDATE_SPEC_OPTION_SUCCESS = "specOption/UPDATE_SPEC_OPTION_SUCCESS";
export const UPDATE_SPEC_OPTION_FAIL = "specOption/UPDATE_SPEC_OPTION_FAIL";

export const SET_SPEC_OPTION = "specOption/SET_SPEC_OPTION";

// action creators
export const fetchSpecOptions = (query) => ({
  type: FETCH_SPEC_OPTIONS,
  query
});

export const fetchSpecOptionsSuccess = (specOptions = []) => ({
  type: FETCH_SPEC_OPTIONS_SUCCESS,
  specOptions,
});

export const fetchSpecOptionsFail = (error) => ({
  type: FETCH_SPEC_OPTIONS_FAIL,
  error,
});

export const createSpecOption = (data) => ({
  type: CREATE_SPEC_OPTION,
  data,
});

export const createSpecOptionSuccess = (specOption) => ({
  type: CREATE_SPEC_OPTION_SUCCESS,
  specOption,
});

export const createSpecOptionFail = (error) => ({
  type: CREATE_SPEC_OPTION_FAIL,
  error,
});

export const updateSpecOption = (data, id) => ({
  type: UPDATE_SPEC_OPTION,
  data,
  id,
});

export const updateSpecOptionSuccess = (specOption) => ({
  type: UPDATE_SPEC_OPTION_SUCCESS,
  specOption,
});

export const updateSpecOptionFail = (error) => ({
  type: UPDATE_SPEC_OPTION_FAIL,
  error,
});

export const setSpecOption = (specOption) => ({
  type: SET_SPEC_OPTION,
  specOption,
});
