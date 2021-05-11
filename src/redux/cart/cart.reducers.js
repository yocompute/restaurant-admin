import {
  SET_CART,
  CLEAR_CART,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_SELECTED_ADDITION
} from './cart.actions';

import {
  getOrderSummary,
  getCartItemSummary,
  getCartItemIndex,
  removeCartItem,
} from "../../utils";

import { OrderStatus, ProductType } from "../../const";

export const DEFAULT_CART = {
  items: [],
  status: OrderStatus.New,
  user: null,
  qrcode: null,
  payment: null,
  note: '',
  subTotal: 0,
  saleTax: 0,
  total: 0
}

/**
 * item: ICartItem = {
 *  _id: string,
 *  type: string,
 *  product,
 *  price,
 *  cost,
 *  saleTaxRate,
 *  purchaseTaxRate,
 *  addtions: [{ addition, quantity }]
 *  quantity: number,
 *  subTotal: number
 * }
 */
export const cartReducer = (state = DEFAULT_CART, action) => {
  switch (action.type) {
    case SET_CART: // fix me !
      return { items: action.items }
    case CLEAR_CART:
      return DEFAULT_CART;

    // item:ICartItem {product, quantity}
    case UPDATE_CART_ITEM:
      const item = action.item;

      if (item && item.quantity !== 0) {
        const index = getCartItemIndex(state.items, item);
        const itemSummary = getCartItemSummary(item);
        const newItems = [...state.items];
        if (index !== -1) {
          newItems[index] = { ...item, ...itemSummary };
          return { ...state, items: newItems };
        } else {
          newItems.push({ ...item, ...itemSummary });
        }

        const orderSummary = getOrderSummary({ ...state, items: newItems });
        return { ...state, ...orderSummary, items: newItems };
      } else {
        const items = removeCartItem(state.items, item);
        const orderSummary = getOrderSummary({ ...state, items });
        return { ...state, ...orderSummary, items };
      }

    case UPDATE_CART_ITEM_QUANTITY:
      const quantity = action.quantity;
      if (quantity === 0) {
        const product = action.product;
        const items = removeCartItem(state.items, {product, comboId: action.comboId});
        const orderSummary = getOrderSummary({ ...state, items });
        return { ...state, ...orderSummary, items };
      } else {
        const product = action.product;
        const index = getCartItemIndex(state.items, {product, comboId: action.comboId});
        if (index !== -1) {
          const newItems = [...state.items];
          const newItem = { ...state.items[index], quantity };
          const itemSummary = getCartItemSummary(newItem);
          newItems[index] = { ...newItem, ...itemSummary };
          const orderSummary = getOrderSummary({ ...state, items: newItems });
          return { ...state, ...orderSummary, items: newItems };
        } else {
          // pass, should never happen
        }
      }
      return state;

    case UPDATE_SELECTED_ADDITION:
      const index = state.items.findIndex(it => it.comboId === action.comboId);
      if (index !== -1) {
        const quantity = action.quantity;
        const addition = action.addition;
        const combo = state.items[index];
        const additions = [...combo.additions];
        const newItems = [...state.items];

        if (quantity === 0) {
          const newCombo = {
            ...combo,
            additions: additions.filter(it => it.product._id !== addition._id)
          };
          const itemSummary = getCartItemSummary(newCombo);
          newItems[index] = { ...newCombo, ...itemSummary };
          const orderSummary = getOrderSummary({ ...state, items: newItems });
          return { ...state, ...orderSummary, items: newItems };
        } else {
          const additionIndex = additions.findIndex(it => it.product._id === addition._id);
          if (additionIndex !== -1) {
            additions[additionIndex] = { product: addition, quantity };
            const newCombo = {
              ...combo,
              additions,
            }
            const itemSummary = getCartItemSummary(newCombo);
            newItems[index] = { ...newCombo, ...itemSummary };
            const orderSummary = getOrderSummary({ ...state, items: newItems });
            return { ...state, ...orderSummary, items: newItems };
          } else {
            // should not happen
            // return {
            //     _id,
            //     product,
            //     additions: [...additions, { product: addition, quantity }],
            // }
          }
        }
      } else {
        // pass
      }
  }

  return state;
}


