import {
    SET_NOTIFICATION,
    CLEAR_NOTIFICATION,
  } from "./notification.actions";
 
  export const notificationReducer = (state = null, action) => {
    if (action && action.type === SET_NOTIFICATION) {
      return { ...action.notification };
    }

    if (action && action.type === CLEAR_NOTIFICATION) {
      return { ...action.notification };
    }
  
    return state;
  };
  