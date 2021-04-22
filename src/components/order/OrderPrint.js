import React from 'react';

import { toDateTimeString } from "../../utils";

import './OrderPrint.css';

const OrderPrint = ({ order }) => {
    return <div class="section-to-print">
        <div class="center">{order.brand.name}</div>
        <div class="center">{order.brand.street}, {order.brand.city}</div>
        <div class="center">{order.brand.phoneNumber}</div>
        <div class="center">HST {order.brand.taxNumber}</div>
        <div class="center">------------------------------</div>
        <div class="center">{order.qrcode ? order.qrcode.name : ''} {order.qrcode ? order.qrcode.tag : ''}</div>
        <div class="center">{toDateTimeString(order.createUTC)}</div>
        <div class="center">------------------------------</div>
        {
            order.items && order.items.length > 0 &&
            order.items.map(item => {
                return item.quantity > 0 &&
                    <div class="cart-item" key={item.refId}>
                        <div class="product-row">
                            <div class="product-name-col">{item.product.name}</div>
                            <div class="product-quantity-col">x{item.quantity}</div>
                            <div class="product-price-col">${item.price * item.quantity}</div>
                        </div>
                        {
                            item.additions && item.additions.length > 0 &&
                            item.additions.map(it =>
                                <div key={it.product._id} class="addition-row">
                                    <div class="addition-name-col">{it.name}</div>
                                    <div class="addition-quantity-col">x{it.quantity}</div>
                                    <div class="addition-price-col">${it.price * it.quantity}</div>
                                </div>
                            )
                        }
                    </div>
            }
            )
        }
        <div class="summary-row">
            <div class="title-col">Subtotal</div>
            <div class="amount-col">${order.subTotal}</div>
        </div>
        <div class="row">
            <div class="title-col">HST</div>
            <div class="amount-col">${order.saleTax}</div>
        </div>
        <div class="row">
            <div class="title-col">Total</div>
            <div class="amount-col">${order.total}</div>
        </div>

    </div>
}

export default OrderPrint;