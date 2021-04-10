// action types
export const FETCH_BRANDS = "brand/FETCH_BRANDS";
export const FETCH_BRANDS_SUCCESS = "brand/FETCH_BRANDS_SUCCESS";
export const FETCH_BRANDS_FAIL = "brand/FETCH_BRANDS_FAIL";

export const CREATE_BRAND = "brand/CREATE_BRAND";
export const CREATE_BRAND_SUCCESS = "brand/CREATE_BRAND_SUCCESS";
export const CREATE_BRAND_FAIL = "brand/CREATE_BRAND_FAIL";

export const UPDATE_BRAND = "brand/UPDATE_BRAND";
export const UPDATE_BRAND_SUCCESS = "brand/UPDATE_BRAND_SUCCESS";
export const UPDATE_BRAND_FAIL = "brand/UPDATE_BRAND_FAIL";

export const SET_BRAND = "brand/SET_BRAND";

// action creators
export const fetchBrands = (query) => ({
  type: FETCH_BRANDS,
  query
});

export const fetchBrandsSuccess = (brands = []) => ({
  type: FETCH_BRANDS_SUCCESS,
  brands,
});

export const fetchBrandsFail = (error) => ({
  type: FETCH_BRANDS_FAIL,
  error,
});

export const createBrand = (data) => ({
  type: CREATE_BRAND,
  data,
});

export const createBrandSuccess = (brand) => ({
  type: CREATE_BRAND_SUCCESS,
  brand,
});

export const createBrandFail = (error) => ({
  type: CREATE_BRAND_FAIL,
  error,
});

export const updateBrand = (data, id) => ({
  type: UPDATE_BRAND,
  data,
  id,
});

export const updateBrandSuccess = (brand) => ({
  type: UPDATE_BRAND_SUCCESS,
  brand,
});

export const updateBrandFail = (error) => ({
  type: UPDATE_BRAND_FAIL,
  error,
});

export const setBrand = (brand) => ({
  type: SET_BRAND,
  brand,
});
