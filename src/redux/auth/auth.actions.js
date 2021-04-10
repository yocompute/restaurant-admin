// action types
export const FETCH_AUTH = 'auth/FETCH_AUTH';
export const FETCH_AUTH_SUCCESS = 'auth/FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAIL = 'auth/FETCH_AUTH_FAIL';


export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'auth/LOGIN_FAIL';

export const SIGNUP = 'auth/SIGNUP';
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'auth/SIGNUP_FAIL';

export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

export const SET_AUTH = 'auth/SET_AUTH';

// action creators
export const fetchAuth = (query) => ({
    type: FETCH_AUTH,
    query
})

export const fetchAuthSuccess = (tokenId, user) => ({
    type: FETCH_AUTH_SUCCESS,
    tokenId,
    user
})

export const logout = () => ({
    type: LOGOUT
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const login = (data) => ({
    type: LOGIN,
    data
})

export const loginSuccess = (tokenId) => ({
    type: LOGIN_SUCCESS,
    tokenId,
})

export const loginFail = error => ({
    type: LOGIN_FAIL,
    error
})

export const signup = (data) => ({
    type: SIGNUP,
    data
})

export const signupSuccess = (tokenId) => ({
    type: SIGNUP_SUCCESS,
    tokenId,
})

export const signupFail = error => ({
    type: SIGNUP_FAIL,
    error
})

export const setAuth = (tokenId, user) => ({
    type: SET_AUTH,
    tokenId,
    user
})