import PropTypes from "prop-types";
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import SettingsIcon from '@material-ui/icons/Settings';

import { selectQuantity } from '../../redux/cart/cart.selectors';


const Menu = {
  HOME: 'Home',
  HISTORY: 'History',
  SETTINGS: 'Settings'
}
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const Footer = ({ type, quantity }) => {
  const classes = useStyles();
  const [menu, setMenu] = useState(Menu.HOME)

  return <div className="footer">
    {
      type === 'menu' && window.matchMedia(`(max-width: 768px)`).matches &&
      <BottomNavigation
        value={menu}
        onChange={(event, newValue) => {
          setMenu(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Cart" icon={
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCartIcon />
          </Badge>
        } />
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    }
    {/* {
        type === 'button' &&
        <div className="row bottom-bar">
            <Link style={{ textDecoration: 'none' }} to={{ pathname: user? "/order": "/login-select" }} >
                <div className="bottom-btn btn-col" >Checkout</div>
            </Link>
        </div>
      } */}
  </div>
}

Footer.propTypes = {
  quantity: PropTypes.any,
  type: PropTypes.string
}


const mapStateToProps = state => ({
  user: state.auth.user,
  quantity: selectQuantity(state)
});

export default connect(
  mapStateToProps,
  null
)(Footer);