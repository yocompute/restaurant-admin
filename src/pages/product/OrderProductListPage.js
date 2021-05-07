import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

import OrderProductList from "../../components/product/OrderProductList";
import CategoryTabs from "../../components/category/CategoryTabs";
import CartEditor from "../../components/cart/CartEditor";

import { fetchProducts } from "../../redux/product/product.actions";
import { setCategory } from "../../redux/category/category.actions";
import { createOrder } from "../../redux/order/order.actions";
import { selectCategoryMap } from "../../redux/product/product.selectors";
import { selectQuantity } from "../../redux/cart/cart.selectors";
import { selectAuthUser } from "../../redux/auth/auth.selectors";
import { OrderStatus } from "../../const";
import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  page: {
    paddingTop: "80px",
    width: "100%",
  },
  card:{
    padding: "20px",
  },
  products: {
    margin: 0,
  },
  row: {
    width: "100%",
    display: "flex"
  },
  menu: {
    width: "60%"
  },
  cart: {
    width: "40%"
  }
}));

const OrderProductListPage = ({
  user,
  qrcode,
  brand,
  cart,
  categoryMap,
  fetchProducts,
  setCategory,
  createOrder,
}) => {
  const classes = useStyles();
  const {t} = useTranslation();
  // const history = useHistory();

  useEffect(() => {
    fetchProducts({ brand: brand._id, type: { $ne: 'A' } });
  }, [brand, fetchProducts]);

  useEffect(() => {
    if (categoryMap && Object.values(categoryMap).length > 0) {
      setCategory(Object.values(categoryMap)[0]);
    }
  }, [categoryMap]);

  const handleSelectCategory = (category) => {
    setCategory(category);
    if (category.ref) {
      category.ref.current.scrollIntoView();
    }
  };

  const toOrder = (cart) => {
    const p = {
      items: [],
      note: '',
      subTotal: 0,
      saleTax: 0,
      total: 0,
      status: OrderStatus.New,
      user: user._id,
      qrcode: qrcode._id
    }

    cart.items.forEach(it => {
      const additions = [];
      if (it.additions && it.additions.length > 0) {
        it.additions.forEach(addition => {
          additions.push({
            product: addition.product._id,
            name: addition.product.name,
            price: addition.product.price,
            cost: addition.product.cost,
            saleTaxRate: addition.product.saleTaxRate,
            purchaseTaxRate: addition.product.purchaseTaxRate,
            quantity: addition.quantity
          });
        })
      }

      p.items.push({
        // refId: it.refId,
        product: it.product._id,
        price: it.product.price,
        cost: it.product.cost,
        saleTaxRate: it.product.saleTaxRate,
        purchaseTaxRate: it.product.purchaseTaxRate,
        brand: it.product.brand._id,
        additions,
        quantity: it.quantity,
        subTotal: it.subTotal,
        saleTax: it.saleTax,
      });
      p.subTotal += it.subTotal;
      p.saleTax += it.saleTax;
    });

    p.subTotal = Math.round(p.subTotal * 100) / 100;
    p.saleTax = Math.round(p.saleTax * 100) / 100;
    p.total = Math.round((p.subTotal + p.saleTax) * 100) / 100;
    return p;
  }

  const handleCheckout = () => {
    // history.push('/cart');
    const order = toOrder(cart);
    createOrder(order);
  }

  return (
    <div className={classes.page}>
      {/* <Button onClick={handleCheckout}>Checkout</Button> */}

      <div className={classes.row}>
        <Box m={2} className={classes.menu}>
          <Card>
            <div className={classes.categories}>
              <CategoryTabs
                data={categoryMap ? Object.values(categoryMap) : null}
                onSelect={handleSelectCategory}
              />
            </div>
            <div className={classes.products}>
              <OrderProductList data={categoryMap} />
            </div>
          </Card>
        </Box>
        <Box m={2} className={classes.cart}>
          {
            cart.items && cart.items.length > 0 &&
            <Card className={classes.card}>
              <CartEditor />
              <Button variant="contained" color="primary" onClick={handleCheckout}>{t("Checkout")}</Button>
            </Card>
          }
        </Box>
      </div>
    </div>
  );
};

OrderProductListPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    history: PropTypes.object,
    location: PropTypes.object,
  }),
};

const mapStateToProps = (state) => ({
  user: state.user,
  qrcode: state.qrcode,
  brand: state.brand,
  cart: state.cart,
  user: selectAuthUser(state),
  categoryMap: selectCategoryMap(state),
  nProducts: selectQuantity(state),
  products: state.products,
});

export default connect(mapStateToProps, {
  fetchProducts,
  setCategory,
  createOrder
})(OrderProductListPage);
