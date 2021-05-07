
import { createSelector } from 'reselect';
import { selectProduct } from '../product/product.selectors';
export const selectCart = (state) => state.cart

export const selectQuantity = createSelector([selectCart], (cart) => {
    let quantity = 0;
    if(cart && cart.items){
        cart.items.forEach(item => quantity += item.quantity);
    }
    return quantity;
});


export const selectProductQuantity = createSelector([selectCart, selectProduct], (cart, product) => {
    const item = cart.items.find(it => it.productId === product._id);
    return item ? item.quantity : 0;
});