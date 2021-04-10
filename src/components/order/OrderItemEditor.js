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

// item --- {productId, productName, quantity}
const OrderItemEditor = ({
  products,
  item,
  onChangeProduct,
  onChangeQuantity,
  onDelete
}) => {
  const { t } = useTranslation();
  // const classes = useStyles();

//   const [model, setModel] = useState(item);
  // const [keyword, setKeyword] = useState('');

  const handleSelectProduct = e => {
    // const productId = e.target.value;
    // const product = products.find(p => p._id === productId);
    // onChangeProduct(product);
    // setModel({ ...model, productId: product._id, productName: product.name }); // update keyword in ProductSearch
  };

  const handleChangeQuantity = q => {
    // const quantity = +q;
    // onChangeQuantity(model.productId, quantity);
    // setModel({ ...model, quantity });
  };

  const handelDelete = () => {
    // onDelete(model);
  };

  return (
    <TableRow>
      <TableCell>
          <Box pb={2}>
            <FormControl>
              <InputLabel id="product-label">{t("Product")}</InputLabel>
              <Select
                id="product"
                labelId="product-label"
                value={item.product._id}
                onChange={handleSelectProduct}
              >
                {
                    products && products.length>0 &&
                products.map(product => {
                  return (
                    <MenuItem key={product._id} value={product._id}>
                      {product.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
      </TableCell>
      <TableCell>
        <TextField
          inputProps={{
            value: item.quantity,
            onChange: e => handleChangeQuantity(e.target.value)
          }}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handelDelete()}>
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default OrderItemEditor;
