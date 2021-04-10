

import {
    FETCH_ROLES_SUCCESS,
    FETCH_ROLE_BY_TOKEN_ID_SUCCESS,
    CREATE_ROLE_SUCCESS,
    UPDATE_ROLE_SUCCESS,
    SET_ROLE
} from './role.actions';

export const rolesReducer = (state = [], action) => {
    if(action && action.type === FETCH_ROLES_SUCCESS){
        return [ ...action.roles ];
    }
    return state;
}

export const roleReducer = (state=null, action) => {
    if(action && action.type === SET_ROLE){
        return { ...action.role};
    }
    
    if(action && action.type === FETCH_ROLE_BY_TOKEN_ID_SUCCESS){
        return { ...action.role};
    }

    if(action && action.type === CREATE_ROLE_SUCCESS){
        return {...action.role };
    }

    if(action && action.type === UPDATE_ROLE_SUCCESS){
        return {...action.role };
    }

    return state;
}