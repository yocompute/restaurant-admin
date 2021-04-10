import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

import { setOrder, createOrder, updateOrder } from "../../redux/order/order.actions";
import { fetchUsers } from "../../redux/user/user.actions";
import { fetchProducts } from "../../redux/product/product.actions";

import OrderItems from "../../components/order/OrderItems";

import OrderEditor from "../../components/order/OrderEditor";
import { selectAuthRoles } from "../../redux/auth/auth.selectors";
import { Role } from "../../const";

const useStyles = makeStyles(() => ({
  root:{
    height: '100%',
  },
  formCtrl: {
    width: "100%",
  },
  uploadRow: {
    paddingBottom: "25px",
    paddingRight: "25px",
  },
  uploadCol: {
    width: "50%",
    float: "left",
  },
  imageCol: {
    width: "50%",
    float: "left",
  },
}));

function OrderFormPage({
  roles,
  users,
  brand,
  products,
  setOrder,
  fetchUsers,
  order,
  updateOrder,
  createOrder,
  fetchProducts,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const history = useHistory();

  const handleClose = () => {
    history.push('/orders');
  };
  const handleSave = (data, id) => {
    const d = {...data, deliverMethods: order.deliverMethods, businessHours: order.businessHours};
    if (id) {
      updateOrder(d, id);
    } else {
      createOrder(d);
    }
  };
  const handleOk = (d) => {
    handleSave(d, order._id);
    history.push('/orders');
  };

  const handleUpdateItemMap = itemMap => {
    // setItemMap(itemMap);
    const vs = Object.values(itemMap);
    const items = vs.filter(v => v._id !== "new");
    // const charge = ApiOrderService.getChargeFromOrderItems(items, 0);
    // setModel({ ...model, ...charge, items });
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, [fetchUsers]);

  useEffect(() => {
    if(roles.indexOf(Role.Super) !== -1){
      fetchProducts();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchProducts({brand: brand._id});
    }
  }, [fetchProducts]);

  return (
    <div className={classes.root}>
      <h2>{order._id? "Edit Order":"Add New Order"}</h2>
      {order && (
        <form onSubmit={handleSubmit(handleOk)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              To add a order, please enter the name and description here.
            </Grid >

            <Grid item xs={3}>
              <FormControl className={classes.formCtrl}>
                <InputLabel id="order-status-select-label">Status</InputLabel>
                <Controller
                  control={control}
                  name="status"
                  defaultValue={order.status}
                  rules={{ required: true }}
                  as={
                    <Select id="order-status-select" value={order.status}>
                      <MenuItem key={"A"} value={"A"}>
                        Active
                    </MenuItem>
                      <MenuItem key={"I"} value={"I"}>
                        Inactive
                    </MenuItem>
                    </Select>
                  }
                />
              </FormControl>
            </Grid>

{
  roles.indexOf(Role.Super) !== -1 &&

            <Grid item xs={3}>
              <FormControl className={classes.formCtrl}>
                <InputLabel id="order-client-select-label">Client</InputLabel>
                <Controller
                  control={control}
                  name="user"
                  defaultValue={order.user && order.user._id}
                  rules={{ required: true }}
                  as={
                    <Select id="order-user-select">
                      {users &&
                        users.map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            {user.username}
                          </MenuItem>
                        ))}
                    </Select>
                  }
                />
              </FormControl>
            </Grid>
}
            <Grid item xs={3}>
              <Controller
                control={control}
                name="Table"
                defaultValue={order.qrcode? order.qrcode.name: ''}

                as={
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Table"
                    type="text"
                    fullWidth
                  />
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="note"
                defaultValue={order.note}
                as={
                  <TextField
                    multiline
                    autoFocus
                    margin="dense"
                    label="Note"
                    type="text"
                    fullWidth
                  />
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="subTotal"
                defaultValue={order.subTotal}

                as={
                  <TextField
                    autoFocus
                    margin="dense"
                    label="SubTotal"
                    type="number"
                    fullWidth
                  />
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="saleTax"
                defaultValue={order.saleTax}

                as={
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Tax"
                    type="number"
                    fullWidth
                  />
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="total"
                defaultValue={order.total}

                as={
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Total"
                    type="number"
                    fullWidth
                  />
                }
              />
            </Grid>

            <Grid item xs={3}>
              <Controller
                control={control}
                name="cost"
                defaultValue={order.cost}

                as={
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Cost"
                    type="number"
                    fullWidth
                  />
                }
              />
            </Grid>
          </Grid>

          {/* <GridItem xs={12} lg={12}> */}
              <Box pb={2}>
                {/* <OrderEditor
                    items={order.items}
                    products={products}
                    merchantId={order.brand}
                    onUpdateItemMap={handleUpdateItemMap}
                /> */}
                <OrderItems items={order.items} />
              </Box>
            {/* </GridItem> */}

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      )}

    </div>
  );
}

OrderFormPage.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.any,
    description: PropTypes.any,
    name: PropTypes.any,
    owner: PropTypes.shape({
      _id: PropTypes.any
    }),
    pictures: PropTypes.shape({
      length: PropTypes.number
    }),
    status: PropTypes.any
  }),
  fetchUsers: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  opened: PropTypes.any,
  setOrder: PropTypes.func,
  users: PropTypes.shape({
    map: PropTypes.func
  })
}



const mapStateToProps = (state) => ({
  roles: selectAuthRoles(state),
  brand: state.brand,
  products: state.products,
  order: state.order,
  users: state.users,
});

export default connect(mapStateToProps, {
  setOrder,
  fetchUsers,
  createOrder,
  updateOrder,
  fetchProducts,
})(OrderFormPage);
