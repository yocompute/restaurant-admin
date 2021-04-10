export const SET_CATEGORY = "category/SET_CATEGORY";
export const FETCH_CATEGORIES = "category/FETCH_CATEGORIES";
export const FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAIL = "category/FETCH_CATEGORIES_FAIL";
export const CREATE_CATEGORY = "category/CREATE_CATEGORY";
export const CREATE_CATEGORY_SUCCESS = "category/CREATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY = "category/UPDATE_CATEGORY";
export const UPDATE_CATEGORY_SUCCESS = "category/UPDATE_CATEGORY_SUCCESS";

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  category,
});

export const fetchCategories = (query) => ({
  type: FETCH_CATEGORIES,
  query
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories,
});

export const fetchCategoriesFail = (categories) => ({
  type: FETCH_CATEGORIES_FAIL,
  categories,
});

export const createCategory = (data) => ({
  type: CREATE_CATEGORY,
  data,
});

export const createCategorySuccess = (category) => ({
  type: CREATE_CATEGORY_SUCCESS,
  category,
});

export const updateCategory = (data, id) => ({
  type: UPDATE_CATEGORY,
  data,
  id,
});

export const updateCategorySuccess = (category) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  category,
});
