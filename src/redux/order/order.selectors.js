import { createSelector } from 'reselect'
import { OrderStatus, PaymentStatus } from '../../const';
import { selectQrcode } from '../qrcode/qrcode.selectors';
import { selectQrcodesByType } from '../qrcode/qrcode.selectors';

export const selectOrders = (state) => state.orders;
export const selectOrderStatus = (state) => state.orderStatus;

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

export const selectUnpaidOrdersByQrcode = createSelector([selectOrders, selectQrcode], (orders, qrcode) => {
    if(orders){
        return orders.filter(p => p.qrcode && qrcode && p.qrcode._id === qrcode._id && p.status !== PaymentStatus.Paid);
    }else{
        return [];
    }
});


export const selectUnpaidQrcodeOrdersByTag = createSelector([selectOrders, selectQrcodesByType], (orders, qrcodes) => {
    if(orders){
        const orderMap = {};
        qrcodes.forEach(qrcode => orderMap[qrcode._id] = {qrcode, orders: []});
        orders.forEach(order => {
            
            if(order.qrcode && order.status !== OrderStatus.Paid){
                const bFound = qrcodes.find(q => q._id === order.qrcode._id);
                if(bFound){
                    orderMap[order.qrcode._id].orders.push(order);
                }
            }
        });
        return orderMap;
    }else{
        return null;
    }
});

export const selectOrdersByStatus = createSelector([selectOrders, selectOrderStatus], (orders, orderStatus) => {
    if(orders){
        return orders.filter(order => order.status === orderStatus);
    }else{
        return [];
    }
})