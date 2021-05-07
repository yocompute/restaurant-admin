import React from 'react';

import { toDateTimeString } from "../../utils";

import './OrderPrint.css';

const OrderPrint = ({ order }) => {
    return <div className="section-to-print">
        <div className="center">{order.brand.name}</div>
        <div className="center">{order.brand.street}, {order.brand.city}</div>
        <div className="center">{order.brand.phoneNumber}</div>
        <div className="center">HST {order.brand.taxNumber}</div>
        <div className="center">------------------------------</div>
        <div className="center">{order.qrcode ? order.qrcode.name : ''} {order.qrcode ? order.qrcode.tag : ''}</div>
        <div className="center">{toDateTimeString(order.createUTC ? order.createUTC : new Date().toISOString())}</div>
        <div className="center">------------------------------</div>
        {
            order.items && order.items.length > 0 &&
            order.items.map(item => {
                return item.quantity > 0 &&
                    <div className="cart-item" key={item._id}>
                        <div className="product-row">
                            <div className="product-name-col">{item.product.name}</div>
                            <div className="product-quantity-col">x{item.quantity}</div>
                            <div className="product-price-col">${item.price * item.quantity}</div>
                        </div>
                        {
                            item.additions && item.additions.length > 0 &&
                            item.additions.map(it =>
                                <div key={it._id} className="addition-row">
                                    <div className="addition-name-col">{it.name}</div>
                                    <div className="addition-quantity-col">x{it.quantity}</div>
                                    <div className="addition-price-col">${it.price * it.quantity}</div>
                                </div>
                            )
                        }
                    </div>
            }
            )
        }
        <div className="summary-row">
            <div className="title-col">Subtotal</div>
            <div className="amount-col">${order.subTotal}</div>
        </div>
        <div className="row">
            <div className="title-col">HST</div>
            <div className="amount-col">${order.saleTax}</div>
        </div>
        <div className="row">
            <div className="title-col">Total</div>
            <div className="amount-col">${order.total}</div>
        </div>

    </div>
}

export default OrderPrint;