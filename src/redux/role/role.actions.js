// action types
export const FETCH_ROLES = "role/FETCH_ROLES";
export const FETCH_ROLES_SUCCESS = "role/FETCH_ROLES_SUCCESS";
export const FETCH_ROLES_FAIL = "role/FETCH_ROLES_FAIL";

export const FETCH_ROLE_BY_TOKEN_ID = "role/FETCH_ROLE_BY_TOKEN_ID";
export const FETCH_ROLE_BY_TOKEN_ID_SUCCESS =
  "role/FETCH_ROLE_BY_TOKEN_ID_SUCCESS";
export const FETCH_ROLE_BY_TOKEN_ID_FAIL = "role/FETCH_ROLE_BY_TOKEN_ID_FAIL";

export const CREATE_ROLE = "role/CREATE_ROLE";
export const CREATE_ROLE_SUCCESS = "role/CREATE_ROLE_SUCCESS";
export const CREATE_ROLE_FAIL = "role/CREATE_ROLE_FAIL";

export const UPDATE_ROLE = "role/UPDATE_ROLE";
export const UPDATE_ROLE_SUCCESS = "role/UPDATE_ROLE_SUCCESS";
export const UPDATE_ROLE_FAIL = "role/UPDATE_ROLE_FAIL";

export const SET_ROLES = "role/SET_ROLES";
export const SET_ROLE = "role/SET_ROLE";

// action creators
export const fetchRoles = (query) => ({
  type: FETCH_ROLES,
  query,
});

export const fetchRolesSuccess = (roles = []) => ({
  type: FETCH_ROLES_SUCCESS,
  roles,
});

export const fetchRolesFail = (error) => ({
  type: FETCH_ROLES_FAIL,
  error,
});

export const fetchRoleByTokenId = (tokenId) => ({
  type: FETCH_ROLE_BY_TOKEN_ID,
  tokenId,
});

export const fetchRoleByTokenIdSuccess = (role = null) => ({
  type: FETCH_ROLE_BY_TOKEN_ID_SUCCESS,
  role,
});

export const fetchRoleByTokenIdFail = (error) => ({
  type: FETCH_ROLE_BY_TOKEN_ID_FAIL,
  error,
});

export const createRole = (data) => ({
  type: CREATE_ROLE,
  data,
});

export const createRoleSuccess = (role) => ({
  type: CREATE_ROLE_SUCCESS,
  role,
});

export const createRoleFail = (error) => ({
  type: CREATE_ROLE_FAIL,
  error,
});

export const updateRole = (data, id) => ({
  type: UPDATE_ROLE,
  data,
  id,
});

export const updateRoleSuccess = (role) => ({
  type: UPDATE_ROLE_SUCCESS,
  role,
});

export const updateRoleFail = (error) => ({
  type: UPDATE_ROLE_FAIL,
  error,
});

export const setRole = (role) => ({
  type: SET_ROLE,
  role,
});
