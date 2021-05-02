import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';

import { fetchUsers } from '../../redux/user/user.actions';
import { updatePayment, createPayment} from '../../redux/payment/payment.actions';
import { useTranslation } from "react-i18next";
import { PaymentStatus } from "../../const";

const useStyles = makeStyles(() => ({
    formCtrl: {
      width: '100%'
    },
}));
function PaymentFormPage({ users, fetchUsers, data, updatePayment, createPayment }) {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation();

    const { control, handleSubmit } = useForm();
    const handleClose = () => {
        history.push('/payments');
    };

    const handleSave = (data) => {
        if(data && data._id){
            updatePayment(data);
        }else{
            createPayment(data);
        }
    }
    const handleOk = (d) => {
        handleSave(d);
        history.push('/payments');
    }

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className={classes.root}>
            <h3 id="form-dialog-title">Add New Payment</h3>
            <form onSubmit={handleSubmit(handleOk)}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        To add a payment, please enter the name and description here.
                    </Grid>

                    <Grid item xs={3}>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue={data.name}
                        as={<TextField
                            autoFocus
                            margin="dense"
                            label="name"
                            type="text"
                            fullWidth
                        />}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="description"
                        as={<TextField
                            autoFocus
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                        />}
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl className={classes.formCtrl}>
                        <InputLabel id="product-status-select-label">Status</InputLabel>
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: true }}
                            as={
                                <Select id="product-status-select">
                      <MenuItem key={PaymentStatus.New} value={PaymentStatus.New}>
                        {t("New")}
                    </MenuItem>
                      <MenuItem key={PaymentStatus.Paid} value={PaymentStatus.Paid}>
                        {t("Paid")}
                    </MenuItem>
                    <MenuItem key={PaymentStatus.Cancelled} value={PaymentStatus.Cancelled}>
                        {t("Cancelled")}
                    </MenuItem>
                                </Select>
                            }
                        />
                    </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl className={classes.formCtrl}>
                        <InputLabel id="payment-user-select-label">Owner</InputLabel>
                        <Controller
                            control={control}
                            name="user"
                            rules={{ required: true }}
                            as={
                                <Select id="payment-user-select">
                                    {
                                        users &&
                                        users.map(user =>
                                            <MenuItem key={user._id} value={user._id}>{user.username}</MenuItem>
                                        )
                                    }
                                </Select>
                            }
                        />
                    </FormControl>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </div>
    );
}

PaymentFormPage.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.any
  }),
  fetchUsers: PropTypes.func,
  users: PropTypes.shape({
    map: PropTypes.func
  })
}



const mapStateToProps = state => ({
    users: state.users,
    data: state.payment,
});

export default connect(
    mapStateToProps,
    {
        fetchUsers,
        updatePayment,
        createPayment,
    }
)(PaymentFormPage);