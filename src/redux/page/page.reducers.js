import {SET_LOADING, SET_PAGE} from '../page/page.actions';

export const pageReducer = (state={loading: false}, action) => {
    if(action && action.type === SET_PAGE){
        return { ...action.page };
    }
    if(action && action.type === SET_LOADING){
        return { ...state, loading: action.loading}
    }
    return state;
}