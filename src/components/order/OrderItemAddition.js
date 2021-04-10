import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex'
    },
    link:{
        textDecoration: 'none'
    },
    textCol: {
        width: '200px',
        height: '40px',
        float: 'left',
        display: 'flex',
        boxSizing: 'border-box',
        padding: '0px 20px'
    },
    name: {
        float: 'left',
        width: 'calc(100% - 100px)',
        color: '#666',
        fontSize: '18px'
    },
    price: {
        float: 'left',
        width: '100px',
        color: '#666',
        paddingTop: '2px',
        fontSize: '18px'
    },
    quantityCol:{
        width: 'calc(100% - 200px)',
        height: '40px',
        float: 'left',
        display: 'block',
        boxSizing: 'border-box',
        padding: '0px 20px'
    },
}));

const Addition = ({product, addition, quantity, onChange}) => {
    const classes = useStyles();

    // function toCartItem(product){
    //     return {
    //         productId: product._id,
    //         productName: product.name,
    //         brandId: product.brand._id,
    //         price: product.price,
    //         cost: product.cost,
    //         saleTaxRate: product.saleTaxRate,
    //         purchaseTaxRate: product.purchaseTaxRate,
    //         quantity: 0
    //     }
    // }

    /**
     * 
     * @param {*} d  {item [CartItem or AddtionItem], quantity [number]}
     */
    function handleQuantityChange(d) {
        // addtion, product, d.quantity

        // if(d.item){
        //     updateCartItem({
        //         ...d.item,
        //         quantity: d.quantity
        //     });
        // }

        onChange(product, addition, d.quantity);
    }

    return addition &&
        <div className={classes.root}>
            <div className={classes.textCol}> 
                <div className={classes.name}>{addition.name}</div>
                <div className={classes.price}>${addition.price}</div>
            </div>
            <div className={classes.quantityCol}>
                {quantity}
            </div>
        </div>
}

Addition.propTypes = {
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
});

export default connect(
    mapStateToProps,
    null
)(Addition);