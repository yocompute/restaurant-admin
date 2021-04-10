import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Button from '@material-ui/core/Button';

import ListTable from '../../components/table/ListTable';
import { fetchPayments, setPayment } from '../../redux/payment/payment.actions';
import { selectPopulatedPayments } from '../../redux/payment/payment.selectors';
import { useHistory } from 'react-router-dom';
const columns = [
    { field: "createUTC", label: "Created Date", type: "date" },
    { field: "user", label: "User", type: 'object', property:'username' },
    { field: "total", label: "Total" },
    { field: "description", label: "Description" },
    { field: "status", label: "Status" },
    { field: "actions", label: "Actions" },
];

const defaultSort = ['createUTC', -1];

const DEFAULT_BRAND = {
    _id: '',
    logoUrl:'',
    name:'',
    description:'',
    status: '',
    owner:'',
    createUTC:'',
    actions:'',
}

const PaymentListPage = ({ fetchPayments, setPayment, payments }) => {
    const history = useHistory();

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);


    const handleOpenPaymentDialog = () => {
        setPayment(DEFAULT_BRAND);
        history.push('/payments/new')
    }

    const handleEditRow = (row) => {
        setPayment(row);
        setTimeout(() => {
            history.push(`/payments/${row._id}`);
          }, 100)
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpenPaymentDialog}>Add</Button>
            {
                payments &&
                <ListTable
                    label="payment"
                    defaultSort={defaultSort}
                    columns={columns}
                    rows={payments}
                    onEditRow={handleEditRow}
                />
            }
        </div>
    )
}

PaymentListPage.propTypes = {
  fetchPayments: PropTypes.func,
  payments: PropTypes.any,
}

const mapStateToProps = state => ({
    payments: selectPopulatedPayments(state)
});

export default connect(
    mapStateToProps,
    { 
        fetchPayments,
        setPayment,
    }
)(PaymentListPage);