import React, {useState, useEffect} from 'react';

// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tile from './tile';

import {
    fetchQrcodes,
    setQrcodeTag,
} from "../../redux/qrcode/qrcode.actions";
import { selectAuthRoles } from "../../redux/auth/auth.selectors";
import { fetchOrders } from "../../redux/order/order.actions";
import { fetchPayments } from "../../redux/payment/payment.actions";
import { QrcodeTag, Role } from "../../const";

import DineTab from './DineTab';
import TakeawayTab from './TakeawayTab';

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

const DashbordPage = ({
    brand,
    qrcode,
    fetchQrcodes,
    setQrcodeTag,
    fetchPayments,
    qrcodeTag,
    roles,
    payment,
    }) => {

    const classes = useStyles();
    // const history = useHistory();
    const handleTabChange = (event, v) => {
        setQrcodeTag(v);
    }

    useEffect(() => {
        if(roles){
            if (roles.indexOf(Role.Super) !== -1) {
                fetchQrcodes();
            } else if (roles.indexOf(Role.Admin) !== -1) {
                if(brand){
                    fetchQrcodes({ brand: brand._id });
                }
            }
        }
    }, [fetchQrcodes, brand]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments, qrcode, payment]);
    const [checked, setChecked] = React.useState(true);

    // const handleChangeCheckbox = (event) => {
    //   setChecked(event.target.checked);
    // };
    // const [value, setValue] = React.useState('female');

    return (
        // <div>
        //     <div className={classes.tileRow}>
        //         {
        //             qrcodes &&
        //             qrcodes.map(tile => (
        //                 <Tile key={tile.name} data={tile} onSelect={handleClick}/>
        //             ))
        //         }
        //     </div>
        // </div>
        <div className={classes.paper}>
        <Tabs variant="fullWidth" value={qrcodeTag} onChange={handleTabChange}>
            <Tab value={QrcodeTag.Dine} label="Dine" />
            <Tab value={QrcodeTag.Takeaway} label="Takeaway" />
        </Tabs>
        {qrcodeTag === QrcodeTag.Dine && (
            // <Box p={3}>
            <DineTab  />
            // </Box>
        )}
        {qrcodeTag === QrcodeTag.Takeaway && (
            // <Box p={3}>
            <TakeawayTab />
            // </Box>
        )}
    </div>
    )
}

const mapStateToProps = state => ({
    roles: selectAuthRoles(state),
    brand: state.brand,
    qrcodes: state.qrcodes,
    qrcodeTag: state.qrcodeTag,
    orders: state.orders,
    qrcode: state.qrcode,
    payment: state.payment
});

export default connect(
    mapStateToProps,
    {
        fetchQrcodes,
        fetchOrders,
        setQrcodeTag,
        fetchPayments,
    }
)(DashbordPage);