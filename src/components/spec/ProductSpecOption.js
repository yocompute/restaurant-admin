import PropTypes from "prop-types";
import React from 'react';


// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    wrapper:{
        display: 'flex'
    },
    button: {
        margin: theme.spacing(1),
        float: 'left'
    },
    name: {
        float: 'left',
        width: '150px'
    }
}));


export const ProductSpecOption = ({ item, onSelect, onChange }) => {
    const classes = useStyles();

    
    const handleChange = (e) => {
        const v = e.target.value;
        onChange({...item, price: v});
    }

    const handleSelect = (item) => {
        onSelect(item);
    }

    return (
        <div className={classes.wrapper} onClick={handleSelect}>
            <div className={classes.name}>{item.name}</div>
            <input className={classes.price} type="text" value={item.price} onChange={handleChange} />
        </div>
    )

}
ProductSpecOption.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.any,
    price: PropTypes.any
  }),
  onChange: PropTypes.func,
  onSelect: PropTypes.any
}
