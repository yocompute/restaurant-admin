import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Addition from './Addition';

const useStyles = makeStyles(() => ({
    root:{
        width: '100%',
        padding: '20px 0px'
    },
    checkboxCol: {
        width: '40px',
        height: '40px',
        float: 'left',
        display: 'block',
        boxSizing: 'border-box',
        padding: '20px'
    },
    textCol:{
        width: 'calc(100% - 40px)',
        height: '40px',
        float: 'left',
        display: 'block',
        boxSizing: 'border-box',
        padding: '20px'
    },
    name: {
        color: '#666',
        fontSize: '18px'
    },
    price: {
        color: '#333',
        paddingTop: '10px',
        fontSize: '22px'
    }
}));

const Additions = ({data, onChange}) => {
    const classes = useStyles();
    const [additions, setAdditions] = useState();
    useEffect(() => {
        setAdditions(data);
    }, []);

    function handleChange(addition) {
        const a = [];
        additions.forEach(sd => {
            if(sd._id === addition._id){
                a.push(addition);
            }else{
                a.push(sd);
            }
        })
        setAdditions(a);
        onChange(a);
    }

    return (
        additions ?
        <div className={classes.root}>
            <div>Additions:</div>
            {
                additions.map(sd => 
                    <Addition key={sd._id}
                        addition={sd}
                        onChange={handleChange}
                    />
                )
            }
        </div>
        :
        <div />
    )
}

Additions.propTypes = {
  data: PropTypes.any,
  onChange: PropTypes.func
}

// Additions.propTypes = {
//     match: PropTypes.shape({
//         params: PropTypes.shape({
//             id: PropTypes.string
//         })
//     }),
//     history: PropTypes.object
// };


const mapStateToProps = state => ({
    product: state.product
});

export default connect(
    mapStateToProps,
    null
)(Additions);