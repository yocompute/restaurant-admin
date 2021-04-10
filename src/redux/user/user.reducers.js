

import {
    FETCH_USERS_SUCCESS,
    FETCH_USER_BY_TOKEN_ID_SUCCESS,
    CREATE_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    SET_USER
} from './user.actions';

export const usersReducer = (state = [], action) => {
    if(action && action.type === FETCH_USERS_SUCCESS){
        return [ ...action.users ];
    }
    return state;
}

export const userReducer = (state=null, action) => {
    if(action && action.type === SET_USER){
        return { ...action.user};
    }
    
    if(action && action.type === FETCH_USER_BY_TOKEN_ID_SUCCESS){
        return { ...action.user};
    }

    if(action && action.type === CREATE_USER_SUCCESS){
        return {...action.user };
    }

    if(action && action.type === UPDATE_USER_SUCCESS){
        return {...action.user };
    }

    return state;
}