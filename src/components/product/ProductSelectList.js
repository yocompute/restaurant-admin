import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import { AddTextButton } from "../common/Button";
import { updateCartItem } from "../../redux/cart/cart.actions";
import { setProduct, setCombo } from "../../redux/product/product.actions";
import { useTranslation } from "react-i18next";
import { ProductType } from "../../const";


const useStyles = makeStyles(() => ({
    root: {
        margin: '0 20px',
    },
    productRow: {
        width: "100%",
        display: "block",
        boxSizing: "border-box",
        margin: "12px 0px",
    },
    row: {
        width: "100%",
        paddingLeft: 10,
        display: "flex",
    },
    name: {
        color: "#333",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: "18px",
        marginBottom: 5,
        width: "120px"
    },
    price: {
        color: "#aaa",
        fontSize: 16,
        fontWeight: 400,
        marginBottom: 5,
        width: "50px"
    },
    productDescription: {
        color: "#333",
        fontSize: 15,
        fontWeight: 300,
        letterSpacing: 0.5,
    },
}));

const ProductSelectList = ({ data, cart, updateCartItem, setProduct, setCombo }) => {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();

    // combo --- ICartItem
    function handleSelect(product) {
        setProduct(product);
        setCombo({
            comboId: uuidv4(),
            type: ProductType.Combo,
            product,
            additions: [],
            price: product.price,
            cost: product.cost,
            saleTaxRate: product.saleTaxRate,
            purchaseTaxRate: product.purchaseTaxRate,
            subTotal:0,
            saleTax: 0,
            quantity: 0,
        });

        history.push(`/combos/${product._id}`);
    }

    /**
     * 
     * @param {*} d:  {item[IProduct], quantity[number]}
     */
    function handleQuantityChange(product, quantityDiff) {
        if (product) {
            const item = (cart.items && cart.items.length > 0) ? cart.items.find(it => it.product._id === product._id) : null;
            const quantity = item ? item.quantity + quantityDiff : quantityDiff;

            updateCartItem({
                product,
                quantity
            });
        }
    }

    function handleIncrease(product){
        handleQuantityChange(product, 1);
    }

    return (
        data && Object.keys(data).length > 0 ?
            <div className={classes.root}>
                {
                    Object.keys(data).map((categoryName) => (
                        data[categoryName].products && data[categoryName].products.length > 0 &&
                        <div
                            className={classes.category}
                            key={data[categoryName]._id}
                            id={data[categoryName]._id}
                        >
                            <div ref={data[categoryName].ref}>{categoryName}</div>
                            {
                                data[categoryName].products.map(product =>
                                    <div className={classes.productRow} key={product._id}>
                                        <div className={classes.row}>
                                            <div className={classes.name}>{product.name}</div>
                                            <div className={classes.price}>${product.price}</div>
                                            {
                                                product.type !== 'S' ?
                                                    // <QuantityInput
                                                    //     onChange={handleQuantityChange}
                                                    //     val={0}
                                                    //     item={product}
                                                    // />
                                                    <Button size="small" variant="outlined" onClick={(e) => handleSelect(product)}>{t("Choose Spec")}</Button> 
                                                    :
                                                    <AddTextButton size="small" variant="outlined" text="Add" onClick={() => handleIncrease(product)}/>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
            :
            <div>No Category is available</div>
    )
};

const mapStateToProps = (state) => ({
    product: state.product,
    cart: state.cart
});

export default connect(mapStateToProps,
    {
        updateCartItem,
        setProduct,
        setCombo
    })(ProductSelectList);
