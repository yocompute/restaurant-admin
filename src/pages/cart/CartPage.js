import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import { CartItemList } from '../../components/cart/CartItemList';
import { updateCartItemQuantity, updateSelectedAddition } from '../../redux/cart/cart.actions';
import { CartSummary } from '../../components/cart/CartSummary';


const useStyles = makeStyles( () => ({
    page: {
        padding: '0px'
    },
    list: {
        padding: '20px',
    },
}));

const CartPage = ({cart, updateCartItemQuantity, updateSelectedAddition}) => {
    const classes = useStyles();
    
    // d: IQuantityInputResult --- { comboId, item: IProduct, quantity }
    const handleQuantityChange = (d) => {
        updateCartItemQuantity(d.comboId, d.item, d.quantity);
    }

    // d: IQuantityInputResult --- { comboId, item, quantity }
    const handleAdditionQuantityChange = (d) => {
        updateSelectedAddition(d.comboId, d.item, d.quantity);
    }

    return (
        <div className={classes.page}>
            {/* <Header title={'Order Page'}></Header> */}
            <div className={classes.list}>
            <CartItemList 
                items={cart.items} 
                onQuantityChange={handleQuantityChange}
                onAdditionQuantityChange={handleAdditionQuantityChange}
            />
            </div>
            {/* <div className="label payment-label">Payment Method</div> */}
            {/* <PaymentMethodSelect onSelect={handlePaymentMethodSelect}></PaymentMethodSelect> */}

            <CartSummary cart={cart} />
        </div>
    )
}

CartPage.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.any
  }),
  updateCartItemQuantity: PropTypes.func,
  updateSelectedAddition: PropTypes.func
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(
    mapStateToProps,
    {
        updateCartItemQuantity,
        updateSelectedAddition
    }
)(CartPage);