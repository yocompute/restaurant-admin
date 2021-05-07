import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  root: {
      padding: '20px 0px',
  },
  summary:{
      padding: '10px 0px'
  },
  summaryRow:{
      width: '100%',
      height: '22px',
  },
  nameCol:{
      float: 'left',
      width: 'calc(100% - 100px)',
      // padding: '0px 30px'
  },
  priceCol:{
      float: 'left',
      width: '100px',
      // padding: '0px 50px'
  }
}));

export const CartSummary = ({ cart }) => {
  const classes = useStyles();
  const getSummary = (cart) => {
    if(cart.items && cart.items.length > 0){
        let subTotal = 0;
        cart.items.forEach(it => {
            subTotal += it.subTotal;
        });

        subTotal = Math.round(subTotal * 100) / 100;
        return {subTotal, tax: (subTotal* 0.13).toFixed(2), total: (subTotal * 1.13).toFixed(2)};
    }else{
        return {subTotal:0, tax:0, total: 0};
    }
  }

  const summary = getSummary(cart);

  return <div className={classes.root}>
                {
                summary && summary.subTotal !== 0 &&
                <div className={classes.summary}>
                    <div className={classes.summaryRow}>
                        <div className={classes.nameCol}>Subtotal</div>
                        <div className={classes.priceCol}>${summary.subTotal}</div>
                    </div>
                    <div className={classes.summaryRow}>
                        <div className={classes.nameCol}>Tax</div>
                        <div className={classes.priceCol}>${summary.tax}</div>
                    </div>
                    <div className={classes.summaryRow}>
                        <div className={classes.nameCol}>Total</div>
                        <div className={classes.priceCol}>${summary.total}</div>
                    </div>
                </div>
            }
  </div>
}