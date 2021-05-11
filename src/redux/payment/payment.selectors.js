import { createSelector } from 'reselect'
import { PaymentStatus } from '../../const';
import { selectQrcode } from '../qrcode/qrcode.selectors';

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

export const selectUnpaidPaymentsByQrcode = createSelector([selectPayments, selectQrcode], (payments, qrcode) => {
    if(payments){
        return payments.filter(p => p.qrcode && qrcode && p.qrcode._id === qrcode._id && p.status !== PaymentStatus.Paid);
    }else{
        return [];
    }
});

export const selectUnpaidPaymentByQrcode = createSelector([selectPayments, selectQrcode], (payments, qrcode) => {
    if(payments){
        const ps = payments.filter(p => p.qrcode && qrcode && p.qrcode._id === qrcode._id && p.status !== PaymentStatus.Paid);
        return (ps && ps.length > 0) ? ps[0] : null;
    }else{
        return null;
    }
});