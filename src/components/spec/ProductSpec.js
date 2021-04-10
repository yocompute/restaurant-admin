
import PropTypes from "prop-types";
import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// import AddIcon from '@material-ui/icons/Add';
import { ProductSpecOption } from "./ProductSpecOption";

const useStyles = makeStyles(() => ({
    wrapper:{
        display: 'flex',
        padding: '5px 0px',
        borderTop: '1px solid #eee',
    },
    spec: {
        width: '100%',
        display: 'flex'
    },
    specName: {
        width: '240px',
        float: 'left'
    },
    button: {
        width: '120px',
        float: 'left'
    },
}))


export const ProductSpec = ({ spec, onChange, onRemove }) => {
    const classes = useStyles();

    const handleOptionChange = (option) => {
        const options = [];
        spec.options.forEach(op => {
            if (op.id === option.id) {
                options.push(option);
            } else {
                options.push(op)
            }
        });
        onChange({...spec, options});
    }

    const handleRemove = () => {
        onRemove(spec);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.spec}>
            <div className={classes.specName}>{spec.name}</div>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
            >
                Delete
            </Button>
            </div>
            {
                spec.options && spec.options.length > 0 &&
                spec.options.map(option =>
                    <ProductSpecOption key={option.name}
                    item={option} onChange={handleOptionChange} />
                )
            }
        </div>
    )
}
ProductSpec.propTypes = {
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  spec: PropTypes.shape({
    name: PropTypes.any,
    options: PropTypes.shape({
      forEach: PropTypes.func,
      length: PropTypes.number,
      map: PropTypes.func
    })
  })
}
