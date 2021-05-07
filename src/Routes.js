import React from 'react'
import { Switch, Route } from 'react-router-dom';

// import {cfg} from './config';
// import {AppMode} from './const';

import HomePage from './pages/HomePage';
import VerificationCodePage from './pages/auth/VerificationCodePage';
import PaymentListPage from './pages/payment/PaymentListPage';
import PaymentFormPage from './pages/payment/PaymentFormPage';
import LoginSelectPage from './pages/auth/LoginSelectPage';
import LocalLoginPage from './pages/auth/LocalLoginPage';
import LocalSignupPage from './pages/auth/LocalSignupPage';
import DashbordPage from './pages/dashbord/index';
import RoleListPage from './pages/role/RoleListPage';
import RoleFormPage from './pages/role/RoleFormPage';
import UserListPage from './pages/user/UserListPage';
import userFormPage from './pages/user/userFormPage';
import BrandListPage from './pages/brand/BrandListPage';
import BrandFormPage from './pages/brand/BrandFormPage';
import CategoryFormPage from './pages/category/CategoryFormPage';
import OrderProductListPage from "./pages/product/OrderProductListPage";
import OrderComboPage from "./pages/product/OrderComboPage";
import CategoryListPage from './pages/category/CategoryListPage';
import ProductListPage from './pages/product/ProductListPage';
import ProductFormPage from './pages/product/ProductFormPage';
import MerchantOrderListPage from './pages/order/MerchantOrderListPage';
import MerchantOrderFormPage from './pages/order/MerchantOrderFormPage';
import QrcodeListPage from './pages/qrcode/QrcodeListPage';
import QrcodeFormPage from './pages/qrcode/QrcodeFormPage';
import SpecListPage from './pages/spec/SpecListPage';
import SpecFormPage from './pages/spec/SpecFormPage';
import CartPage from './pages/cart/CartPage';
import WithAuthorize from './utils/WithAuthorize';

const Routes = () => {
    return (<Switch>
            <Route path="/merchants/:id" component={HomePage} />
            <Route path="/login-select" component={LoginSelectPage} />
            <Route path="/order-product" component={OrderProductListPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/combos/:id" component={OrderComboPage} />
            <Route path="/local-login" component={LocalLoginPage} />
            <Route path="/local-signup" component={LocalSignupPage} />
            <Route path="/verify-code" component={VerificationCodePage} />
            <Route path="/payments/:id" component={WithAuthorize(PaymentFormPage, "/payments")} />
            <Route path="/payments" component={WithAuthorize(PaymentListPage, "/payments")} />
            <Route path="/roles/new" component={WithAuthorize(RoleFormPage, "/roles/new")} />
            <Route path="/roles/:id" component={WithAuthorize(RoleFormPage, "/roles/:id")} />
            <Route path="/roles" component={WithAuthorize(RoleListPage, "/roles")} />
            <Route path="/users/:id" component={userFormPage} />
            <Route path="/users" component={UserListPage} />
            <Route path="/brands/new" component={WithAuthorize(BrandFormPage, "/brands/new")} />
            <Route path="/brands/:id" component={BrandFormPage} />
            <Route path="/brands" component={BrandListPage} />
            <Route path="/categories/:id" component={CategoryFormPage} />
            <Route path="/categories" component={CategoryListPage} />
            <Route path="/qrcodes/:id" component={QrcodeFormPage} />
            <Route path="/qrcodes" component={QrcodeListPage} />
            <Route path="/products/:id" component={ProductFormPage} />
            <Route path="/products" component={ProductListPage} />
            <Route path="/orders/:id" component={MerchantOrderFormPage} />
            <Route path="/orders" component={MerchantOrderListPage} />
            <Route path="/specs/:id" component={SpecFormPage} />
            <Route path="/specs" component={SpecListPage} />
            <Route exact path="/" component={DashbordPage} />
        </Switch>
        
    )
}

export default Routes;