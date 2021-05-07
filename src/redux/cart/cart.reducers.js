import {
  SET_CART,
  CLEAR_CART,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_SELECTED_ADDITION
} from './cart.actions';

import { getSummary } from "../../utils";
import { ProductType } from "../../const";

export const DEFAULT_CART = {
  items: [],
  subTotal: 0,
}

/**
 * item: ICartItem = {
 *  _id: string,
 *  product,
 *  addtions: [{ addition, quantity }]
 *  quantity: number,
 *  subTotal: number
 * }
 */
export const cartReducer = (state = DEFAULT_CART, action) => {
  switch (action.type) {
    case SET_CART:
      return { items: action.items }
    case CLEAR_CART:
      return DEFAULT_CART;

    // item:ICartItem {product, quantity}
    case UPDATE_CART_ITEM:
      const item = action.item;

      if (item && item.quantity !== 0) {
        const index = state.items.findIndex(it => {
          if (it.product.type === ProductType.Single) {
            return it.product._id === item.product._id;
          } else {
            return it.comboId === item.comboId;
          }
        });
        const newItems = [...state.items];
        const summary = getSummary(item);
        if (index !== -1) {
          newItems[index] = { ...item, ...summary };
          return { ...state, items: newItems };
        } else {
          newItems.push({ ...item, ...summary });
        }
        return { ...state, items: newItems };
      } else {
        // delete item
        const items = state.items.filter(it => {
          if (it.product.type === ProductType.Single) {
            return it.product._id !== item.product._id;
          } else {
            return it.comboId !== item.comboId;
          }
        });
        return { ...state, items };
      }

    case UPDATE_CART_ITEM_QUANTITY:
      const quantity = action.quantity;
      if (quantity === 0) {
        const product = action.product;
        const items = state.items.filter(it => {
          if (it.product.type === ProductType.Single) {
            return it.product._id !== product._id;
          } else {
            return it.comboId !== action.comboId;
          }
        });
        return { ...state, items };
      } else {
        const product = action.product;
        const index = state.items.findIndex(it => {
          if (it.product.type === ProductType.Single) {
            return it.product._id === product._id;
          } else {
            return it.comboId === action.comboId;
          }
        });
        if (index !== -1) {
          const newItems = [...state.items];
          const newItem = { ...state.items[index], quantity };
          const summary = getSummary(newItem);
          newItems[index] = { ...newItem, ...summary };
          return { ...state, items: newItems };
        } else {
          // pass, should never happen
        }
      }
      return state;

    case UPDATE_SELECTED_ADDITION:
      const index = state.items.findIndex(it => it.comboId === action.comboId);
      if (index !== -1) {
        const item = state.items[index];
        const additions = [...item.additions];
        const quantity = action.quantity;
        const addition = action.addition;
        const newItems = [...state.items];

        if (quantity === 0) {
          const newItem = {
            ...item,
            additions: additions.filter(it => it.product._id !== addition._id)
          };
          const summary = getSummary(newItem);
          newItems[index] = { ...newItem, ...summary };
          return { ...state, items: newItems };
        } else {
          const additionIndex = additions.findIndex(it => it.product._id === addition._id);
          if (additionIndex !== -1) {
            additions[additionIndex] = { product: addition, quantity };
            const newItem = {
              ...item,
              additions,
            }
            const summary = getSummary(newItem);
            newItems[index] = { ...newItem, ...summary };
            return { ...state, items: newItems };
          } else {
            // should not happen
            // return {
            //     _id,
            //     product,
            //     additions: [...additions, { product: addition, quantity }],
            // }
          }
        }
      }
  }

  return state;
}


