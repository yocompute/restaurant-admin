import PropTypes from "prop-types";
import React, {useState}from 'react';
// import { v4 as uuidv4 } from 'uuid';

// import './CartItemList.scss';

export const CartItemList = ({items}) => {

    return <div className="item-list">
    {
      items && items.length > 0 &&
      items.map(item => 
        <div className="text-sm item-row" key={item.productId}>
          <div className="name-col">{item.productName}</div>
          <div className="quantity-col">x{item.quantity}</div>
          <div className="price-col">${item.price}</div>
        </div>
      )
    }
    </div>
}
CartItemList.propTypes = {
  items: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  })
}
