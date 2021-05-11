import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getOrderSummary } from '../../utils';

const useStyles = makeStyles(() => ({
    root: {
        padding: '20px',
    },
    summary: {
        padding: '10px 0px'
    },
    summaryRow: {
        width: '100%',
        height: '22px',
    },
    nameCol: {
        float: 'left',
        width: 'calc(100% - 100px)',
    },
    amountCol: {
        float: 'left',
        width: '100px',
    }
}));

// interface IOrder  {
//     items: IOrderItem[],
//     note: string,
//     subTotal: number,
//     saleTax: number,
//     total: number,
//     status: string,
//     // brand: IBrand,
//     user: IUser,
//     qrcode: IQrcode,
//     payment: IPayment,
//     createUTC: Date,
//     updateUTC?: Date,
// }

/**
 * 
 * @param {*} order IOrder 
 * @returns 
 */
const OrderSummary = ({ order }) => {
    const classes = useStyles();

    const summary = getOrderSummary(order);

    return <div className={classes.root}>
        {
            summary && summary.subTotal !== 0 &&
            <div className={classes.summary}>
                <div className={classes.summaryRow}>
                    <div className={classes.nameCol}>Subtotal</div>
                    <div className={classes.amountCol}>${summary.subTotal}</div>
                </div>
                <div className={classes.summaryRow}>
                    <div className={classes.nameCol}>Tax</div>
                    <div className={classes.amountCol}>${summary.saleTax}</div>
                </div>
                <div className={classes.summaryRow}>
                    <div className={classes.nameCol}>Total</div>
                    <div className={classes.amountCol}>${summary.total}</div>
                </div>
            </div>
        }
    </div>
}

export default OrderSummary;