// action types
export const FETCH_USERS = "user/FETCH_USERS";
export const FETCH_USERS_SUCCESS = "user/FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "user/FETCH_USERS_FAIL";

export const FETCH_USER_BY_TOKEN_ID = "user/FETCH_USER_BY_TOKEN_ID";
export const FETCH_USER_BY_TOKEN_ID_SUCCESS =
  "user/FETCH_USER_BY_TOKEN_ID_SUCCESS";
export const FETCH_USER_BY_TOKEN_ID_FAIL = "user/FETCH_USER_BY_TOKEN_ID_FAIL";

export const CREATE_USER = "user/CREATE_USER";
export const CREATE_USER_SUCCESS = "user/CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "user/CREATE_USER_FAIL";

export const UPDATE_USER = "user/UPDATE_USER";
export const UPDATE_USER_SUCCESS = "user/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "user/UPDATE_USER_FAIL";

export const SET_USERS = "user/SET_USERS";
export const SET_USER = "user/SET_USER";

// action creators
export const fetchUsers = (query) => ({
  type: FETCH_USERS,
  query,
});

export const fetchUsersSuccess = (users = []) => ({
  type: FETCH_USERS_SUCCESS,
  users,
});

export const fetchUsersFail = (error) => ({
  type: FETCH_USERS_FAIL,
  error,
});

export const fetchUserByTokenId = (tokenId) => ({
  type: FETCH_USER_BY_TOKEN_ID,
  tokenId,
});

export const fetchUserByTokenIdSuccess = (user = null) => ({
  type: FETCH_USER_BY_TOKEN_ID_SUCCESS,
  user,
});

export const fetchUserByTokenIdFail = (error) => ({
  type: FETCH_USER_BY_TOKEN_ID_FAIL,
  error,
});

export const createUser = (data) => ({
  type: CREATE_USER,
  data,
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  user,
});

export const createUserFail = (error) => ({
  type: CREATE_USER_FAIL,
  error,
});

export const updateUser = (data, id) => ({
  type: UPDATE_USER,
  data,
  id,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  error,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
