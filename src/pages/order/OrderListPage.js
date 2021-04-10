import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import ListTable from "../../components/table/ListTable";
import {
  setOrder,
  fetchOrders,
  createOrder,
  updateOrder,
} from "../../redux/order/order.actions";
import { selectAuthUser, selectAuthRoles } from "../../redux/auth/auth.selectors";

import {Role} from "../../const";

const columns = [
  { field: "createUTC", label: "Created Date", type: "date" },
  // { field: "note", label: "Note"},
  { field: "total", label: "Total" },
  // { field: "description", label: "Description" },
  { field: "status", label: "Status" },
  {
    field: "user",
    label: "Client",
    type: "object",
    property: "username",
  },
  {
    field: "qrcode",
    label: "Table",
    type: "object",
    property: "name",
  },
  { field: "actions", label: "Actions" },
];

const defaultSort = ["createUTC", 1];

const DEFAULT_ORDER = {
  _id: "",
  note: "",
  total: 0,
  cost: 0,
  status: "",
  user: "",
  brand: "",
  items: [],
  createUTC: "",
  actions: "",
};

const OrderListPage = ({
  brand,
  roles,
  orders,
  setOrder,
  fetchOrders,
}) => {
  const history = useHistory();

  useEffect(() => {
    setOrder(DEFAULT_ORDER);
  }, []);

  useEffect(() => {
    if(!roles){
      return;
    }
    if(roles.indexOf(Role.Super) !== -1){
      fetchOrders();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchOrders({brand: brand._id});
    }else{
      
    }
  }, [fetchOrders]);


  const handleOpenOrderDialog = () => {
    setOrder(DEFAULT_ORDER);
    history.push('/orders/new')
  }

  const handleEditRow = (row) => {
    setOrder(row);
    setTimeout(() => {
      history.push(`/orders/${row._id}`);
    }, 100)
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenOrderDialog}
      >
        Add
      </Button>

      {orders && (
        <ListTable
          label="order"
          defaultSort={defaultSort}
          columns={columns}
          rows={orders}
          onEditRow={handleEditRow}
        />
      )}
    </div>
  );
};

OrderListPage.propTypes = {
  orders: PropTypes.any,
  createOrder: PropTypes.func,
  fetchOrders: PropTypes.func,
  setOrder: PropTypes.func,
  updateOrder: PropTypes.func
}



const mapStateToProps = (state) => ({
  brand: state.brand,
  roles: selectAuthRoles(state),
  orders: state.orders,
});

export default connect(mapStateToProps, {
  setOrder,
  fetchOrders,
  createOrder,
  updateOrder,
})(OrderListPage);
