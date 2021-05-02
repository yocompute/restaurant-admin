import React, {useState} from "react";
import { connect } from 'react-redux';


import List from "@material-ui/core/List";
import ViewListIcon from "@material-ui/icons/ViewList";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import StoreIcon from '@material-ui/icons/Store';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ShopIcon from '@material-ui/icons/Shop';
import CategoryIcon from "@material-ui/icons/Category";
import NavMenuItem from "./NavMenuItem";
import {Path} from "../const";
import {hasPermission} from '../utils';

import { selectAuthRoles } from '../redux/auth/auth.selectors';
const menus = [
  {
    path: Path.Home,
    text: "Dashboard",
    icon: DashboardIcon,
    tip: "Dashboard",
    selected: true
  },
  {
    path: Path.Roles,
    text: "Manage Roles",
    icon: LocalOfferIcon,
    tip: "Manage Roles",
  },
  {
    path: Path.Users,
    text: "Manage Users",
    icon: PeopleIcon,
    tip: "Manage Users",
  },
  {
    path: Path.Brands,
    text: "Manage Brands",
    icon: StoreIcon,
    tip: "Manage Brands",
  },
  {
    path: Path.Categories,
    text: "Manage Categories",
    icon: CategoryIcon,
    tip: "Manage Categories",
  },
  {
    path: Path.Qrcodes,
    text: "Manage Qrcodes",
    icon: BrandingWatermarkIcon,
    tip: "Manage Qrcodes",
  },
  {
    path: Path.Specs,
    text: "Manage Specs",
    icon: ViewListIcon,
    tip: "Manage Specs",
  },
  {
    path: Path.Products,
    text: "Manage Products",
    icon: ViewComfyIcon,
    tip: "Manage Products",
  },
  {
    path: Path.Orders,
    text: "Manage Orders",
    icon: ShopIcon,
    tip: "Manage Orders",
  },
  {
    path: Path.Payments,
    text: "Manage Payments",
    icon: ShoppingCartIcon,
    tip: "Manage Payments",
  },
  // {
  //   path: '/orders',
  //   text: 'Manage Orders',
  //   icon: <ShoppingCartIconforEach
];

const NavMenuList = ({roles}) => {
  const [data, setData] = useState(menus);

  const handleSelect = (path) => {
    const ms = menus.map(m => {
      if(m.path === path){
        m.selected = true;
      }else{
        m.selected = false;
      }
      return m;
    });
    setData(ms);
  }

  return <List>
    {menus &&
      menus.length &&
      menus.map((menu) => {
        if(hasPermission(roles, menu.path)){
          return <NavMenuItem key={menu.text} data={menu} onSelect={handleSelect}/>
        }
      })
    }
  </List>
};


const mapStateToProps = (state) => ({
  roles: selectAuthRoles(state),
});

export default connect(
  mapStateToProps,
  null,
)(NavMenuList);
