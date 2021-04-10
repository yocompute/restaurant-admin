import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import GridItem from "components/Grid/GridItem.js";
import Box from "@material-ui/core/Box";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
// import ApiProductService from "services/api/ApiProductService";
import OrderItemEditor from "./OrderItemEditor";

const OrderEditor = ({ items, products, onUpdateItemMap }) => {
//   const [itemMap, setItemMap] = useState({});
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     ApiProductService.getProducts({ merchantId, status: "A" }).then(
//       ({ data }) => {
//         setProducts(data.data);
//       }
//     );
//   }, [merchantId]);

  const handelAddOrderItem = () => {
    // const itMap = { ...itemMap };
    // itMap["new"] = { productId: "new", productName: "", quantity: 0 };
    // setItemMap(itMap);
    // fix me
    // if (merchantId) {
    //   ApiProductService.getProducts({ merchantId, status: "A" }).then(
    //     ({ data }) => {
    //       setProducts(data.data);
    //     }
    //   );
    // }
  };

  // item -- {productId, productName, quantity}
  const handleDelete = item => {
    // const itMap = { ...itemMap };
    // delete itMap[item.productId];
    // setItemMap(itMap);
    // onUpdateItemMap(itMap);
  };

  // product - {_id, name}
  const handleChangeProduct = product => {
    // const itMap = { ...itemMap };
    // itMap[product._id] = {
    //   productId: product._id,
    //   productName: product.name,
    //   price: product.price,
    //   cost: product.cost,
    //   taxRate: product.taxRate,
    //   quantity: 1
    // };
    // delete itMap["new"];
    // setItemMap(itMap);
    // onUpdateItemMap(itMap);
  };

  const handleChangeQuantity = (productId, quantity) => {
    // const itMap = { ...itemMap };
    // itMap[productId] = { ...itMap[productId], quantity };
    // setItemMap(itMap);
    // onUpdateItemMap(itMap);
  };

  return (
    <div>
      <IconButton onClick={() => handelAddOrderItem()}>
        <AddCircleOutlineIcon />
      </IconButton>
      {
        items && items.length > 0 &&
        items.map(it => (
          <div key={it.product._id}>
            <OrderItemEditor
              products={products}
              item={it}
              onChangeProduct={handleChangeProduct}
              onChangeQuantity={handleChangeQuantity}
              onDelete={handleDelete}
            />
          </div>
        ))}
    </div>
  );
};

export default OrderEditor;
