import { createSelector } from 'reselect'
export const selectOrders = (state) => state.orders

export const selectPopulatedOrders = createSelector([selectOrders], (orders) => {
    const ps = [];
    if(orders && orders.length > 0){

        orders.forEach( p => {
            const descriptions = [];
            p.items.forEach(it => {
                descriptions.push(`${it.product.name} x ${it.quantity}`);
            })
            ps.push({...p, description: descriptions.join('\n')})
        });
    }
    return ps;
});