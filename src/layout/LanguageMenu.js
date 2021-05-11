import React,{ useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TranslateIcon from '@material-ui/icons/Translate';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  lang:{
      marginLeft: '10px',
    fontSize: '14px'
  }
}));

const LanguageMenu = ({menus, onSelect}) => {
    const classes = useStyles();
    const [menu, setMenu] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClick = (menu) => {
        setAnchorEl(null);
        setMenu(menu);
        onSelect(menu)
      }
      const handleClose = () => {
        setAnchorEl(null);
      };

return <div>
        <IconButton
        aria-label="language"
        aria-controls="menu-appbar-lang"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        >
            <TranslateIcon />
            <div className={classes.lang}>{menu? menu.text : ''}</div>
        </IconButton>
        <Menu
        id="menu-appbar-lang"
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

export default LanguageMenu;