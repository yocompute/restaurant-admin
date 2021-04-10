import PropTypes from "prop-types";
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import NavMenuList from './NavMenuList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));
const Sidebar = ({ expanded, onToggle }) => {
  const classes = useStyles();

  const handleCollapse = () => {
    onToggle(false);
  };

  return (
    <Drawer
      variant="permanent"
      open={expanded}
      classes={{
        paper: clsx(classes.drawerPaper, !expanded && classes.drawerPaperClose),
      }}
    >
      <div className={classes.sidebarHeader}>
        <IconButton onClick={handleCollapse}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <NavMenuList />
    </Drawer>
  );
};

Sidebar.propTypes = {
  expanded: PropTypes.any,
  onToggle: PropTypes.func
}

export default Sidebar;
