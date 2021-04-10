import React from 'react';

// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';

import Tile from './tile'


const useStyles = makeStyles({
    tileRow: {
        display: 'flex'
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const tiles = [
    { name: 'Visitors', text: '120' },
    { name: 'Sales', text: '$3218' },
    { name: 'Activity', text: '500' },
    { name: 'Events', text: '3' },
];

const DashbordPage = () => {

    const classes = useStyles();
    // const bull = <span className={classes.bullet}>•</span>;
    // useEffect(() => {
    //     fetchUsers();
    // }, [fetchUsers]);
    const [checked, setChecked] = React.useState(true);

    // const handleChangeCheckbox = (event) => {
    //   setChecked(event.target.checked);
    // };
    // const [value, setValue] = React.useState('female');

    // const handleChange = (event) => {
    //   setValue(event.target.value);
    // };
    return (
        <div>
            <div className={classes.tileRow}>
                {
                    tiles &&
                    tiles.map(tile => (
                        <Tile key={tile.name} data={tile} />
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(
    mapStateToProps,
    null
)(DashbordPage);