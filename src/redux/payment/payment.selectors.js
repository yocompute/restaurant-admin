import { createSelector } from 'reselect'
export const selectPayments = (state) => state.payments

export const selectPopulatedPayments = createSelector([selectPayments], (payments) => {
    const ps = [];
    if(payments && payments.length > 0){

        payments.forEach( p => {
            const descriptions = [];
            p.items.forEach(it => {
                descriptions.push(`${it.product.name} x ${it.quantity}`);
            })
            ps.push({...p, description: descriptions.join('\n')})
        });
    }
    return ps;
});