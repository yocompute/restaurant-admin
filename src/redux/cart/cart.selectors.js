import { createSelector } from 'reselect'
export const selectCart = (state) => state.cart

export const selectQuantity = createSelector([selectCart], (cart) => {
    let quantity = 0;
    if(cart && cart.items){
        cart.items.forEach(item => quantity += item.quantity);
    }
    return quantity;
});
