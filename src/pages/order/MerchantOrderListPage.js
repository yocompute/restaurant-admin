import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { AddTextButton } from "../../components/common/Button";
import ListTable from "../../components/table/ListTable";
import {
  setOrder,
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  setOrderStatus
} from "../../redux/order/order.actions";


import { selectAuthUser, selectAuthRoles } from "../../redux/auth/auth.selectors";
import { selectOrdersByStatus } from "../../redux/order/order.selectors";

import {Role, OrderStatus} from "../../const";
import { useTranslation } from "react-i18next";

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

const MerchantOrderListPage = ({
  brand,
  roles,
  orders,
  orderStatus,
  setOrder,
  updateOrder,
  deleteOrder,
  fetchOrders,
  setOrderStatus
}) => {
  const history = useHistory();
  const {t} = useTranslation();

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


  const handleAddOrder = () => {
    setOrder(DEFAULT_ORDER);
    history.push('/orders/new')
  }

  const handleEditRow = (row) => {
    setOrder(row);
    setTimeout(() => {
      history.push(`/orders/${row._id}`);
    }, 100)
  };

  const handleCancelRow = (row) => {
    if (row && row._id) {
      deleteOrder(row._id);
      setTimeout(() => {
        fetchOrders({brand: brand._id});
      });
    }
  }
  const handleTabChange = (event, v) => {
    setOrderStatus(v);
  }

  
  return (
      <div>

        <AddTextButton onClick={handleAddOrder} />

        <Tabs variant="fullWidth" value={orderStatus} onChange={handleTabChange}>
            <Tab value={OrderStatus.New} label={t("New")} />
            <Tab value={OrderStatus.Paid} label={t("Paid")} />
            <Tab value={OrderStatus.Cancelled} label={t("Cancelled")} />
        </Tabs>
        
        {orderStatus === OrderStatus.New && orders && 
            <ListTable
              label="order"
              defaultSort={defaultSort}
              columns={columns}
              rows={orders}
              onEditRow={handleEditRow}
              onDeleteRow={handleCancelRow}
            />
        }
        {orderStatus === OrderStatus.Paid && orders &&
            <ListTable
              label="order"
              defaultSort={defaultSort}
              columns={columns}
              rows={orders}
              onEditRow={handleEditRow}
            />
        }
        {orderStatus === OrderStatus.Cancelled && orders &&
            <ListTable
              label="order"
              defaultSort={defaultSort}
              columns={columns}
              rows={orders}
              onEditRow={handleEditRow}
            />
        }

    </div>
  );
};

MerchantOrderListPage.propTypes = {
  orders: PropTypes.any,
  createOrder: PropTypes.func,
  fetchOrders: PropTypes.func,
  setOrder: PropTypes.func,
  updateOrder: PropTypes.func
}



const mapStateToProps = (state) => ({
  brand: state.brand,
  roles: selectAuthRoles(state),
  orders: selectOrdersByStatus(state),
  orderStatus: state.orderStatus
});

export default connect(mapStateToProps, {
  setOrder,
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  setOrderStatus
})(MerchantOrderListPage);
