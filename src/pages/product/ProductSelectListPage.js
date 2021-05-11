import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

import ProductSelectList from "../../components/product/ProductSelectList";
import CategoryTabs from "../../components/category/CategoryTabs";
import CartEditor from "../../components/cart/CartEditor";

import { fetchProducts } from "../../redux/product/product.actions";
import { setCategory } from "../../redux/category/category.actions";
import { createOrder } from "../../redux/order/order.actions";
import { createPayment } from "../../redux/payment/payment.actions";

import { selectCategoryMap } from "../../redux/product/product.selectors";
import { selectQuantity } from "../../redux/cart/cart.selectors";
import { selectAuthUser } from "../../redux/auth/auth.selectors";
import { selectUnpaidPaymentByQrcode } from "../../redux/payment/payment.selectors";
import { OrderStatus, PaymentStatus } from "../../const";
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

const ProductSelectListPage = ({
  user,
  qrcode,
  brand,
  cart,
  payment,
  categoryMap,
  fetchProducts,
  setCategory,
  createPayment,
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
          const a ={
            ...addition,
            ...addition.product,
            product: addition.product._id,
          };
          delete a._id;
          additions.push(a);
        })
      }

      // rely on clean redux
      p.items.push({
        ...it,
        product: it.product._id,
        brand: it.product.brand._id,
        additions,
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
    if(!user || !qrcode){
      return;
    }else{
      const order = toOrder(cart);
      if(!payment){
        const p = {
          orders: [order],
          user: user._id,
          qrcode: qrcode._id,
          status: PaymentStatus.New,
          note: '',
          subTotal: order.subTotal,
          saleTax: order.saleTax,
          total: order.total
        }
        createPayment(p);
      }else{
        createOrder({...order, payment: payment._id});
      }
    }
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
              <ProductSelectList data={categoryMap} />
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

ProductSelectListPage.propTypes = {
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
  products: state.products,
  user: selectAuthUser(state),
  categoryMap: selectCategoryMap(state),
  nProducts: selectQuantity(state),
  payment: selectUnpaidPaymentByQrcode(state),
});

export default connect(mapStateToProps, {
  fetchProducts,
  setCategory,
  createPayment,
  createOrder
})(ProductSelectListPage);
