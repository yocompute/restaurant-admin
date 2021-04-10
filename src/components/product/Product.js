import PropTypes from "prop-types";
import React from 'react'

export function Product({data}){
    return (
        <div>
            <div>{data.name}]</div>
            <div>{data.description}</div>
        </div>
    )
}
Product.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.any,
    name: PropTypes.any
  })
}
