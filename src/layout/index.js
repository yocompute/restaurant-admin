import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import Sidebar from './Sidebar';
import Header from './Header';
import Routes from '../Routes';
import { clearNotification } from '../redux/notification/notification.actions';

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  container: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '100%',
  },
}));

function Layout({notification, clearNotification}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [open, setOpen] = useState(false);

  const handleSidebarToggle = (expanded) => {
    setSidebarExpanded(expanded);
  };
  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearNotification();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(notification ? notification.show: false);
  }, [notification]);

  return (
    <div className={classes.page}>
      <Header
        sidebarExpanded={sidebarExpanded}
        onToggle={handleSidebarToggle}
      />

      <Sidebar
        expanded={sidebarExpanded}
        onToggle={handleSidebarToggle}
      />

      <Paper className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={fixedHeightPaper}>
          <Routes />
        </div>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        message={notification ? notification.error: ''}
        onClose={handleNotificationClose}
        />
      </Paper>

    </div>
  );
}

Layout.propTypes = {
  clearNotification: PropTypes.func,
  notification: PropTypes.shape({
    error: PropTypes.any,
    show: PropTypes.any
  })
}


const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(
  mapStateToProps,
  {clearNotification},
)(Layout);

