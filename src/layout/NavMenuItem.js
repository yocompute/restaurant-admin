import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(() => ({
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const NavMenuItem = ({ data, onSelect }) => {
  const classes = useStyles();
  const handleClick = () => {
    onSelect(data.path);
  }
  return (
    <NavLink to={data.path} className={classes.link} onClick={handleClick}>
      <Tooltip title={data.tip} TransitionComponent={Fade} placement="right">
        <ListItem button selected={data.selected}>
          <ListItemIcon >
            <data.icon color="primary"/>
            </ListItemIcon>
          <ListItemText>{data.text}</ListItemText>
        </ListItem>
      </Tooltip>
    </NavLink>
  );
};

NavMenuItem.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.any,
    path: PropTypes.any,
    text: PropTypes.any,
    tip: PropTypes.any
  })
}

export default NavMenuItem;
