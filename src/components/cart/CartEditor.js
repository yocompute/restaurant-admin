import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import { CartItemList } from '../../components/cart/CartItemList';
import { CartSummary } from '../../components/cart/CartSummary';
import { updateCartItemQuantity, updateSelectedAddition } from '../../redux/cart/cart.actions';

const useStyles = makeStyles( () => ({
    root: {
        padding: '0px'
    },
    // list: {
    //     padding: '20px',
    // },
}));

const CartEditor = ({cart, updateCartItemQuantity, updateSelectedAddition}) => {
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
        <div className={classes.root}>
            <div className={classes.list}>
            <CartItemList 
                items={cart.items} 
                onQuantityChange={handleQuantityChange}
                onAdditionQuantityChange={handleAdditionQuantityChange}
            />
            </div>
            <CartSummary cart={cart} />
        </div>
    )
}

CartEditor.propTypes = {
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
)(CartEditor);