import React, {useEffect} from 'react';

// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';

import Tile from './tile';

import {
    fetchQrcodes,
    setQrcode,
} from "../../redux/qrcode/qrcode.actions";

import { selectQrcodesByType } from "../../redux/qrcode/qrcode.selectors";
import { selectAuthRoles } from "../../redux/auth/auth.selectors";
import { fetchOrders } from "../../redux/order/order.actions";
import { Role } from "../../const";
import { OrderStatus } from "../../const";
import OrderItems from "../../components/order/OrderItems";

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

const TakeawayTab = ({
    brand,
    setQrcode,
    fetchOrders,
    qrcodes,
    roles,
    orders,
    }) => {

    const classes = useStyles();
    // const history = useHistory();

    // const bull = <span className={classes.bullet}>•</span>;
    // useEffect(() => {
    //     fetchUsers();
    // }, [fetchUsers]);
    const [checked, setChecked] = React.useState(true);

    // const handleChangeCheckbox = (event) => {
    //   setChecked(event.target.checked);
    // };
    // const [value, setValue] = React.useState('female');

    const handleClick = (qrcode) => {
        if(qrcode){
            fetchOrders({qrcode: qrcode._id, status: OrderStatus.NEW});
        }
    };

    return (
        <div>
            <div className={classes.tileRow}>
                {
                    qrcodes &&
                    qrcodes.map(tile => (
                        <Tile key={tile.name} data={tile} onSelect={handleClick}/>
                    ))
                }
            </div>
            {/* <div className={classes.tileRow}>
                {
                    orders &&
                    orders.map(order => (
                        <OrderItems key={order._id} items={order.items} />
                    ))
                }
            </div> */}
        </div>
    )
}

const mapStateToProps = state => ({
    roles: selectAuthRoles(state),
    brand: state.brand,
    qrcodes: selectQrcodesByType(state),
    orders: state.orders
});

export default connect(
    mapStateToProps,
    {
        fetchQrcodes,
        setQrcode,
        fetchOrders
    }
)(TakeawayTab);