import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '4px 20px',
        width: '100%',
    },
    cartItem: {
      padding: '10px 0px',
      borderBottom: '1px solid #eee',
    },
    productRow: {
        paddingBottom: '3px',
        width: '100%',
        height: '30px',
        fontSize: '14px',
    },
    additionRow: {
        width: '100%',
        height: '20px',
        fontSize: '12px',
        color: 'rgba(0,0,0,0.54)',
    },

    productNameCol: {
        width: 'calc(100% - 130px)',
        float: 'left',
        padding: '4px 0px'
    },
    quantityCol: {
      width: '50px',
      float: 'left',
      padding: '4px 0px 0px 0px',
    },
    productPriceCol: {
        width: '80px',
        float: 'left',
        padding: '4px 0px'
    },

    additionNameCol: {
        width: 'calc(100% - 140px)',
        float: 'left',
        padding: '2px 0px 2px 10px'
    },
    additionQuantityCol: {
      width: '50px',
      float: 'left',
      padding: '2px 0px',
  },
    additionPriceCol: {
        width: '80px',
        float: 'left',
        padding: '2px 0px'
    },
}));

// item --- IOrderItem: { type, product, quantity }
const OrderItems = ({items}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        {
            items && items.length > 0 &&
            items.map(item =>
                {
                    return item.quantity > 0 &&
                    <div className={classes.cartItem} key={item.product._id}>
                        <div className={classes.productRow}>
                            <div className={classes.productNameCol}>{item.product.name}</div>
                            <div className={classes.quantityCol}>x{item.quantity}</div>
                            <div className={classes.productPriceCol}>${item.subTotal}</div>
                        </div>
                        {
                            item.additions && item.additions.length > 0 &&
                            item.additions.map(it =>
                                <div key={it.product._id} className={classes.additionRow}>
                                    <div className={classes.additionNameCol}>{it.name}</div>
                                    <div className={classes.additionQuantityCol}>x{it.quantity}</div>
                                    <div className={classes.additionPriceCol}>${it.price * it.quantity}</div>
                                </div>
                            )
                        }
                    </div>
                }
            )
        }
            {/* <CartSummary cart={cart}/> */}
            {/* <div className="label payment-label">Payment Method</div> */}
            {/* <PaymentMethodSelect onSelect={handlePaymentMethodSelect}></PaymentMethodSelect> */}
        </div>
    )
}



const mapStateToProps = state => ({
    orders: state.orders,
});

export default connect(
    mapStateToProps,
    null
)(OrderItems);