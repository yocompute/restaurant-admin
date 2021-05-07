import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  SET_CATEGORY,
  SET_CATEGORY_MAP,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
} from "./category.actions";

export const categoriesReducer = (state = null, action) => {
  if (action && action.type === FETCH_CATEGORIES_SUCCESS) {
    return [...action.categories];
  }
  return state;
};

export const categoryReducer = (state = null, action) => {
  if (action && action.type === SET_CATEGORY) {
    return { ...action.category };
  }
  
  if (action && action.type === FETCH_CATEGORY_SUCCESS) {
    return { ...action.category };
  }
  
  if (action && action.type === CREATE_CATEGORY_SUCCESS) {
    return { ...action.category };
  }
  if (action && action.type === UPDATE_CATEGORY_SUCCESS) {
    return { ...action.category };
  }
  return state;
};

export const categoryMapReducer = (state = null, action) => {
  if (action && action.type === SET_CATEGORY_MAP) {
    return {...action.categoryMap};
  }

  return state;
};
