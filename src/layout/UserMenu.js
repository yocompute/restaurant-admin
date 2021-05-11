import React,{ useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  user:{
    float: 'right'
  }
}));

const UserMenu = ({user, menus, onSelect}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClick = (menu) => {
        setAnchorEl(null);
        onSelect(menu)
      }
      const handleClose = () => {
        setAnchorEl(null);
      };

return <div>
    <div className={classes.user}>{user ? user.username: ''}</div>
        <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        >
        <AccountCircle />
        </IconButton>
        <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        >
            {
                menus.map(menu => <MenuItem onClick={() => handleClick(menu)}>{menu.text}</MenuItem>)
            }
        </Menu>
        </div>
}

export default UserMenu;