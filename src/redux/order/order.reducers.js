import { OrderStatus } from "../../const";
import {
  FETCH_ORDERS_SUCCESS,
  CREATE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS,
  SET_ORDER,
  SET_ORDER_STATUS,
} from "./order.actions";

export const ordersReducer = (state = null, action) => {
  if (action && action.type === FETCH_ORDERS_SUCCESS) {
    return [...action.orders];
  }
  return state;
};

export const orderReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ORDER:
      return { ...action.order };
    case CREATE_ORDER_SUCCESS:
      return { ...action.order };
    case UPDATE_ORDER_SUCCESS:
      return { ...action.order };
    case DELETE_ORDER_SUCCESS:
      return { ...action.order };
    default:
      return state;
  }
};

export const orderStatusReducer = (state = OrderStatus.New, action) => {
  if (action && action.type === SET_ORDER_STATUS) {
    return action.status;
  }

  return state;
};