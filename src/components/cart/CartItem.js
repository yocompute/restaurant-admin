import React from 'react';

import { QuantityInput } from '../common/QuantityInput';
import { makeStyles } from '@material-ui/core/styles';
import { ProductType } from '../../const';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '4px 4px 3px 0px',
        width: '100%',
        borderBottom: '1px solid #eee',
    },
    productRow: {
        paddingBottom: '3px',
        width: '100%',
        height: '40px'
    },
    additionRow: {
        width: '100%',
        height: '40px'
    },
    quantityCol: {
        padding: '2px 0px 0px 0px',
        width: '120px',
        float: 'right'
    },
    productNameCol: {
        width: '150px',
        fontSize: '14px',
        float: 'left',
        padding: '8px 0px'
    },
    productPriceCol: {
        width: '50px',
        fontSize: '14px',
        float: 'left',
        padding: '8px 0px'
    },

    additionQuantityCol: {
        padding: '2px 0px 0px 0px',
        width: '120px',
        float: 'right'
    },
    additionNameCol: {
        width: '140px',
        color: 'rgba(0,0,0,0.54)',
        fontSize: '12px',
        float: 'left',
        padding: '8px 0px 8px 10px'
    },
    additionPriceCol: {
        width: '50px',
        color: 'rgba(0,0,0,0.54)',
        fontSize: '14px',
        float: 'left',
        padding: '8px 0px'
    },
}));

/**
 * 
 * @param {*} item: ICartItem { _id, product, price, additions } 
 * @returns 
 */
export const CartItem = ({ item, onQuantityChange, onAdditionQuantityChange }) => {
    const classes = useStyles();


    // d: IQuantityInputResult --- ICartItem: { item: IProduct, quantity }
    const handleQuantityChange = (d) => {
        onQuantityChange({ ...d, comboId: item.comboId });
    }

    // d: IQuantityInputResult --- IAdditionalItem: { item: IAddition, quantity }
    const handleAdditionQuantityChange = (d) => {
        onAdditionQuantityChange({ ...d, comboId: item.comboId });
    }

    return <div className={classes.root}>
        <div className={classes.productRow}>
            <div className={classes.productNameCol}>{item.product.name}</div>
            <div className={classes.productPriceCol}>${item.subTotal}</div>
            <div className={classes.quantityCol}>
                <QuantityInput
                    onChange={handleQuantityChange}
                    val={item.quantity}
                    item={item.product}
                />
            </div>
        </div>
        {
            item.additions && item.additions.length > 0 &&
            item.additions.map(it =>
                <div key={it.product._id} className={classes.additionRow}>
                    <div className={classes.additionNameCol}>{it.product.name}</div>
                    <div className={classes.additionPriceCol}>${it.product.price * it.quantity}</div>
                    <div className={classes.additionQuantityCol}>
                        <QuantityInput
                            onChange={handleAdditionQuantityChange}
                            val={it.quantity}
                            item={it.product}
                        />
                    </div>
                </div>
            )
        }

    </div>
}