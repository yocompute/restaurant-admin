import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import './App.css';

import LoginSelectPage from './pages/auth/LoginSelectPage';
import LocalLoginPage from './pages/auth/LocalLoginPage';
import LocalSignupPage from './pages/auth/LocalSignupPage';

import Layout from './layout/index';
import { fetchAuth } from './redux/auth/auth.actions';
import { setLoading } from './redux/page/page.actions';

import { selectTokenId, selectAuthRoles, selectAuthUser } from './redux/auth/auth.selectors';
import {
  setBrand,
  fetchBrands,
} from "./redux/brand/brand.actions";
import {Role} from "./const";

function App({ isLoggedIn, roles, user, brands, isLoading, fetchAuth, setLoading, fetchBrands, setBrand }) {
  useEffect(() => {
    setLoading(true);
    fetchAuth(); // checking if cookie has valid tokenId
  }, [fetchAuth]);

  useEffect(() => {
    if(!roles){
      return;
    }
    if(roles.indexOf(Role.Admin) !== -1){
      fetchBrands({owner: user._id});
    }
  }, [fetchBrands, roles, user]);

  useEffect(() => {
    if(brands && brands.length >0){
      setBrand(brands[0]);
    }
  }, [brands]);

  return isLoading ?
    <div>Loading...</div>
    :
    <Router>
      {
        isLoggedIn ?
        <Layout />
        : (
          <Switch>
            <Route path="/login-select" component={LoginSelectPage} />
            <Route path="/local-login" component={LocalLoginPage} />
            <Route path="/local-signup" component={LocalSignupPage} />
            <Redirect from="/" to="/local-login" />
          </Switch>
        )
      }
    </Router>
}

App.propTypes = {
  fetchAuth: PropTypes.func,
  isLoading: PropTypes.any,
  isLoggedIn: PropTypes.any,
  setLoading: PropTypes.func
}

const mapStateToProps = (state) => ({
  isLoggedIn: selectTokenId(state),
  user: selectAuthUser(state),
  roles: selectAuthRoles(state),
  brands: state.brands,
  isLoading: state.page.loading
});

export default connect(
  mapStateToProps,
  { fetchAuth, setLoading, fetchBrands, setBrand },
)(App);
