import PropTypes from "prop-types";
import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    wrapper:{
        display: 'flex',
        padding: '5px 0px',
        borderTop: '1px solid #eee',
    },
    price: {
        width: 'calc(100% - 150px)',
        float: 'left'
    },
    name: {
        float: 'left',
        width: '150px'
    }
}));


export const SpecOption = ({ item, onSelect, onRemove }) => {
    const classes = useStyles();

    const handleRemove = () => {
        onRemove(item.id);
    }

    const handleSelect = () => {
        onSelect(item);
    }

    return (
        <div className={classes.wrapper} >
            <div className={classes.name} onClick={handleSelect}>{item.name}</div>
            <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
            >
                Delete
            </Button>

        </div>
    )
}
SpecOption.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.any
  }),
  onRemove: PropTypes.func,
  onSelect: PropTypes.func
}
