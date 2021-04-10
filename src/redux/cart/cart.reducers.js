export const cartReducer = (state = { items: [] }, action) => {
  const item = action.item;
  switch (action.type) {
    case 'UPDATE_CART':
      if (item && item.quantity > 0) {
        const items = state.items.filter(it => it.productId !== item.productId);
        return { items: [...items, item] };
      } else {
        const items = state.items.filter(it => it.productId !== item.productId);
        return { items };
      }
  }

  return state;
}