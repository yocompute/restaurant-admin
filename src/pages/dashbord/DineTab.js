import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import Tile from './tile';

import { 
    AddTextButton,
    RemoveTextButton,
    PrintTextButton
} from "../../components/common/Button";

import {
    fetchQrcodes,
    fetchQrcodesSuccess,
    setQrcode,
} from "../../redux/qrcode/qrcode.actions";

import { selectQrcodesByType } from "../../redux/qrcode/qrcode.selectors";
import { selectAuthRoles } from "../../redux/auth/auth.selectors";
import { selectUnpaidPaymentsByQrcode } from "../../redux/payment/payment.selectors";
import { selectUnpaidQrcodeOrdersByTag, selectUnpaidOrdersByQrcode } from "../../redux/order/order.selectors";
import { fetchPayments, updatePayment } from "../../redux/payment/payment.actions";
import { setCart, updateCartItemQuantity, updateSelectedAddition } from '../../redux/cart/cart.actions';
import { PaymentStatus } from "../../const";
// import { CartItemList} from "../../components/cart/CartItemList";
import OrderItems from '../../components/order/OrderItems';
import OrderSummary from '../../components/order/OrderSummary';
import OrderPrint from "../../components/order/OrderPrint";

const useStyles = makeStyles({
    tileRow: {
        display: 'flex',
        flexWrap: "wrap"
    },
    row: {
        width: "100%",
        paddingBottom: "5px",
        display: "flex"
    },
    tile:{
        width: "25%"
    },
    root: {
        minWidth: 275,
    },
    payments: {
        width: '100%'
    },
    payment: {
        width: '100%',
        padding: '15px',
        marginBottom: '15px',
        border: '1px solid #eee'
    },
    order: {
        width: '100%'
    },
    staus: {
        paddingLeft: '20px',
        width: '100%'
    },
    buttonRow: {
        width: '100%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    printBtn: {
        marginLeft: "10px"
    },
});

const DineTab = ({
    brand,
    qrcode,
    setQrcode,
    fetchPayments,
    updatePayment,
    fetchQrcodesSuccess,
    qrcodes,
    roles,
    payments,
    orders,
    orderMap,
    setCart,
    updateCartItemQuantity,
    updateSelectedAddition
}) => {

    const classes = useStyles();
    const history = useHistory();
    const [checked, setChecked] = React.useState(true);


    const handleClick = (qrcode) => {
        if (qrcode) {
            qrcodes.forEach(q => {
                if(q._id === qrcode._id){
                    q.selected = true;
                }else{
                    q.selected = false;
                }
            })
            fetchQrcodesSuccess(qrcodes);
            setQrcode(qrcode);
            // fetchPayments({qrcode: qrcode._id, status: PaymentStatus.NEW});
        }
    }

    const handlePay = (payment) => {
        updatePayment({ status: PaymentStatus.Paid }, payment._id);
    }
    
    const handlePrint = () => {
        window.print();
    }

    // d: IQuantityInputResult --- CartItem: { item, quantity }
    const handleQuantityChange = (d) => {
        updateCartItemQuantity(d._id, d.quantity);
    }

    // d: IQuantityInputResult --- AdditionItem: { item, quantity }
    const handleAdditionQuantityChange = (d) => {
        updateSelectedAddition(d._id, d.item, d.quantity);
    }

    const handleAddProduct = () => {
        history.push('/order-product');    
    }

    qrcodes &&
    qrcodes.forEach(tile => {
        tile.orders = orderMap[tile._id].orders;
    })
    if(payments && payments.length>0){
        setCart(payments[0].items);
    }
    return (
        <div>
            <div className={classes.tileRow}>
                {
                    qrcodes &&
                    qrcodes.map(tile => (
                        <div className={classes.tile} key={tile._id}>
                            <Tile key={tile.name} data={tile} onSelect={handleClick} />
                        </div>
                    ))
                }
            </div>
            {
                qrcode && qrcode._id &&
                <div className={classes.row}>
                    <Box mr={1}>
                        <AddTextButton variant="outlined" text="Add Dishes" onClick={handleAddProduct}/>
                    </Box>
                    <Box mr={1}>
                        <RemoveTextButton variant="outlined" text="Remove Dishes"/>
                    </Box>
                    <Box mr={1}>
                        <PrintTextButton variant="outlined" text="Print"/>
                    </Box>
                </div>
            }
            <div className={classes.payments}>
                {
                    payments &&
                    payments.map(payment => (
                        <div className={classes.payment} key={payment._id} >

                            <div className={classes.status}>Status: {payment.status === PaymentStatus.NEW ? 'Not Paid' : 'Paid'}</div>
                            <OrderItems items={payment.items} />

                            <OrderSummary order={payment} />

                                <div className={classes.buttonRow}>
                                    <Button variant="outlined" color="primary" onClick={() => handlePay(payment)}>
                                        Set as Paid
                                    </Button>
                                    <Button variant="outlined" color="primary" onClick={handlePrint} className={classes.printBtn}>
                                        Print
                                    </Button>
                                </div>
                        </div>
                    ))
                }
            </div>
            {
                orders && orders.length > 0 &&
                <OrderPrint order={orders[0]} />
            }
        </div>
    )
}

const mapStateToProps = state => ({
    roles: selectAuthRoles(state),
    brand: state.brand,
    qrcodes: selectQrcodesByType(state),
    qrcode: state.qrcode,
    payments: selectUnpaidPaymentsByQrcode(state),
    orders: selectUnpaidOrdersByQrcode(state),
    orderMap: selectUnpaidQrcodeOrdersByTag(state)
});

export default connect(
    mapStateToProps,
    {
        fetchQrcodes,
        setQrcode,
        fetchPayments,
        updatePayment,
        fetchQrcodesSuccess,
        setCart,
        updateCartItemQuantity,
        updateSelectedAddition
    }
)(DineTab);