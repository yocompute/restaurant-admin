import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import { AddTextButton } from '../../components/common/Button';
import { updateCartItem } from '../../redux/cart/cart.actions';
import AdditionSelectList from "../../components/product/AdditionSelectList";

import { selectProductQuantity } from '../../redux/cart/cart.selectors';
import { useHistory } from 'react-router';


const useStyles = makeStyles(() => ({
    root:{
        width: "100%",
        paddingTop: "80px",
    },
    product:{
        width: '100%',
    },
    row: {
        width: '100%',
        display: 'flex'
    },
    name: {
        color: '#666',
        paddingRight: '30px',
        fontSize: '18px'
    },
    price: {
        color: '#333',
        paddingTop: '10px',
        fontSize: '18px'
    }
}));

const ComboSelectPage = ({product, combo, updateCartItem}) => {
    const classes = useStyles();
    const history = useHistory();

    const handleCheckout = () => {
        if(combo){
            updateCartItem({
                ...combo,
                quantity: 1
            });
        }
        history.push(`/order-product`);
    }

    return (
        <div className={classes.root}>
            {
                product &&
                <div className={classes.product}>
                    <div className={classes.row}> 
                        <div className={classes.name}>{product.name}</div>
                        <div className={classes.price}>${product.price}</div>
                    </div>

                    <div className={classes.row}>
                        {
                            product && product.additions && product.additions.length > 0 &&
                            <AdditionSelectList additions={product.additions}/>
                        }
                    </div>
                </div>
            }
            <AddTextButton variant="outlined" color="primary" text="Add" onClick={handleCheckout} />
        </div>
    )
}

ComboSelectPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    history: PropTypes.object
};


const mapStateToProps = state => ({
    product: state.product,
    brand: state.brand,
    combo: state.combo,
    quantity: selectProductQuantity(state)
});

export default connect(
    mapStateToProps,
    {updateCartItem}
)(ComboSelectPage);