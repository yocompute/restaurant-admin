
import {
    FETCH_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    FETCH_ADDITIONS_SUCCESS,
    SET_PRODUCT,
    SET_ADDITIONS
} from './product.actions';

export const productsReducer = (state=null, action) => {
    if(action && action.type === FETCH_PRODUCTS_SUCCESS){
        return [ ...action.products ];
    }
    return state;
}

export const productReducer = (state=null, action) => {
    if(action && action.type === SET_PRODUCT){
        return { ...action.product};
    }

    if(action && action.type === CREATE_PRODUCT_SUCCESS){
        return {...action.product };
    }

    if(action && action.type === UPDATE_PRODUCT_SUCCESS){
        return {...action.product };
    }

    return state;
}


export const additionsReducer = (state=null, action) => {
    if(action && action.type === FETCH_ADDITIONS_SUCCESS){
        if(action.additions){
            action.additions.forEach(a => a.checked = true); // set all checked
            return [ ...action.additions ];
        }else{
            return null;
        }
    }
    if(action && action.type === SET_ADDITIONS){
        if(action.additions){
            return { ...action.additions };
        }else{
            return null;
        }
    }
    return state;
}