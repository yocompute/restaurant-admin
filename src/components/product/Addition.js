import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(() => ({
    root:{
        width: '100%',
        height: '40px',
        display: 'flex'
    },
    checkboxCol: {
        width: '30px',
        height: '30px',
        float: 'left',
        display: 'block',
        boxSizing: 'border-box',
        padding: '2px 10px'
    },
    textCol:{
        width: 'calc(100% - 40px)',
        height: '32px',
        float: 'left',
        display: 'block',
        boxSizing: 'border-box',
        padding: '11px 20px'
    },
    name: {
        float: 'left',
        color: '#666',
        width: '200px',
        fontSize: '14px'
    },
    price: {
        float: 'left',
        color: '#666',
        fontSize: '16px',
        paddingTop: '3px'
    }
}));

const Addition = ({addition, onChange}) => {
    const classes = useStyles();

    function handleChange() {
        if(addition){
            onChange({
                ...addition,
                checked: !addition.checked
            });
        }
    }

    return addition &&
        <div className={classes.root}>
            <div className={classes.checkboxCol}>
                <Checkbox
                    checked={addition.checked}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'Side dish' }}
                />
            </div>
            <div className={classes.textCol}> 
                <div className={classes.name}>{addition.name}</div>
                <div className={classes.price}>${addition.price}</div>
            </div>
        </div>
}

Addition.propTypes = {
  addition: PropTypes.shape({
    checked: PropTypes.any,
    name: PropTypes.any,
    price: PropTypes.any
  }),
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  onChange: PropTypes.func
}


const mapStateToProps = state => ({
    product: state.product
});

export default connect(
    mapStateToProps,
    null
)(Addition);