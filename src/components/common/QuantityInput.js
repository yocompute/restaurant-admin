import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  quantityCtrl: {
    width: '150px'
  },
  increaseBtn: {
    width: '30px',
    height: '30px',
    float: 'left'
  },
  decreasebtn: {
    width: '30px',
    height: '30px',
    float: 'left'
  },
  quantityInput: {
    width: 'calc(100% - 80px)',
    float: 'left',
    height: '30px',
    border: '1px solid #888'
  }
}))


export const QuantityInput = ({val, onChange}) => {
    const classes = useStyles();

    const [quantity, setQuantity] = useState(val);

  const increase = () => {
    const v = quantity + 1;
    setQuantity(v);
    onChange(v);
  }

  const decrease = () => {
    if(quantity > 0){
      const v = quantity - 1;
      setQuantity(v);
      onChange(v);
    }
  }

  const change = (e) => {
    const v = e.target.value;
    onChange(v);
  }

    return (
      <div className={classes.quantityCtrl}>
        <div className="increase-btn" onClick={increase}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path fill="#0F9D58" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
        </div>
        
        <input className="quantity-input" type="number" value={quantity} onChange={change} />

        <div className="decrease-btn" onClick={decrease}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path fill="#F4B400" d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>
      </div>
    )
}
QuantityInput.propTypes = {
  onChange: PropTypes.func,
  val: PropTypes.any
}
