// action types
export const FETCH_ORDERS = "order/FETCH_ORDERS";
export const FETCH_ORDERS_SUCCESS = "order/FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "order/FETCH_ORDERS_FAIL";

export const CREATE_ORDER = "order/CREATE_ORDER";
export const CREATE_ORDER_SUCCESS = "order/CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "order/CREATE_ORDER_FAIL";

export const UPDATE_ORDER = "order/UPDATE_ORDER";
export const UPDATE_ORDER_SUCCESS = "order/UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_FAIL = "order/UPDATE_ORDER_FAIL";

export const SET_ORDER = "order/SET_ORDER";
export const SET_ORDER_STATUS = "order/SET_ORDER_STATUS";

// action creators
export const fetchOrders = (query) => ({
  type: FETCH_ORDERS,
  query
});

export const fetchOrdersSuccess = (orders = []) => ({
  type: FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = (error) => ({
  type: FETCH_ORDERS_FAIL,
  error,
});

export const createOrder = (data) => ({
  type: CREATE_ORDER,
  data,
});

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  order,
});

export const createOrderFail = (error) => ({
  type: CREATE_ORDER_FAIL,
  error,
});

export const updateOrder = (data, id) => ({
  type: UPDATE_ORDER,
  data,
  id,
});

export const updateOrderSuccess = (order) => ({
  type: UPDATE_ORDER_SUCCESS,
  order,
});

export const updateOrderFail = (error) => ({
  type: UPDATE_ORDER_FAIL,
  error,
});

export const setOrder = (order) => ({
  type: SET_ORDER,
  order,
});

export const setOrderStatus = (status) => ({
  type: SET_ORDER_STATUS,
  status,
});