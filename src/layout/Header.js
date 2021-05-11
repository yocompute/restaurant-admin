import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';

// import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { logout } from '../redux/auth/auth.actions';

import { selectAuthUser, selectTokenId } from '../redux/auth/auth.selectors';
import UserMenu from './UserMenu';
import LanguageMenu from './LanguageMenu';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconButton: {
    marginLeft: 'auto',
    order: 2,
    float: 'right',
  },
  lang:{
    float: 'right',
  },
  userMenu:{
    float: 'right'
  }
}));

const menus = [
  {name: 'logout', text: 'Logout'}
]
const languageMenus = [
  {name: 'en', text: 'English'},
  {name: 'zh', text: '中文'}
]
const Header = ({
  isLoggedIn, user, logout, sidebarExpanded, onToggle,
}) => {
  const classes = useStyles();
  const {i18n} = useTranslation();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const handleExpand = () => {
    onToggle(true);
  };

  // const handleChange = (event) => {
  //   // setAuth(event.target.checked);
  // };

  const handleSelect = (menu) => {
    if(menu.name === 'logout'){
      logout();
    }
  }

  const handleLanguageSelect = (menu) => {
    i18n.changeLanguage(menu.name);
  }

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, sidebarExpanded && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleExpand}
          className={clsx(classes.menuButton, sidebarExpanded && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>

        {isLoggedIn
          ? (
            <div className={classes.iconButton}>
              <div className={classes.lang}>
              <LanguageMenu  menus={languageMenus} onSelect={handleLanguageSelect} />
              </div>
              <div className={classes.userMenu}>
              <UserMenu  user={user} menus={menus} onSelect={handleSelect}/>
              </div>

            </div>
          )
          : <Redirect to="local-login" />}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.any,
  logout: PropTypes.func,
  onToggle: PropTypes.func,
  sidebarExpanded: PropTypes.any
}

const mapStateToProps = (state) => ({
  isLoggedIn: selectTokenId(state),
  user: selectAuthUser(state),
});

export default connect(
  mapStateToProps,
  {
    logout,
  },
)(Header);
