
export const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM';
export const UPDATE_CART_ITEM_QUANTITY = 'cart/UPDATE_CART_ITEM_QUANTITY';
export const UPDATE_SELECTED_ADDITION = 'cart/UPDATE_SELECTED_ADDITION';
export const CLEAR_CART = 'cart/CLEAR_CART';
export const SET_CART = 'cart/SET_CART';

/**
 * 
 * item: ICartItem = {
 *  _id: string,
 *  product,
 *  addtions: [{ addition, quantity }]
 *  quantity: number,
 *  subTotal: number
 * }
 * 
 */
export const updateCartItem = item => ({
    type: UPDATE_CART_ITEM,
    item
})

export const updateCartItemQuantity = (comboId, product, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    comboId,
    product,
    quantity
})

export const updateSelectedAddition = (comboId, addition, quantity) => ({
    type: UPDATE_SELECTED_ADDITION,
    comboId,
    addition,
    quantity
})

export const setCart = items => ({
    type: SET_CART,
    items
})

export const clearCart = () => ({
    type: CLEAR_CART,
})