import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";

import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { createUser, updateUser, setUser } from "../../redux/user/user.actions";
import theme from "../../theme";

import { makeStyles } from "@material-ui/core/styles";
import { Roles } from "../../const";

const useStyles = makeStyles(() => ({
    root:{
        flexGrow: 1,
    },
    form: {
      padding: "25px",
    },
    formControl:{
        width: "100%",
    },
    uploadRow: {
      paddingBottom: "25px",
      paddingRight: "25px",
    },
    uploadCol: {
      width: "50%",
      float: "left",
    },
    imageCol: {
      width: "50%",
      float: "left",
    },
  }));

function UserFormPage({ user, createUser, updateUser, setUser }) {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const classes = useStyles();

    const handleClose = () => {
        history.push('/users');
    };

    const handleSave = (data, id) => {
        const d = {...data, status: user.status, roles: user.roles};
        if (id) {
            updateUser(d, id);
        } else {
            createUser(d);
        }
    };

    const handleOk = (d) => {
        handleSave(d, user._id);
        history.push('/users');
    };

    const handleStatusChange = (d) => {
        setUser({...user, status: d.target.checked? 'A': 'I'});
    }

    const handleRolesChange = (event) => {
        setUser({...user, roles: event.target.value});
    }

    return (
        <div className={classes.root}>
            <DialogTitle id="form-dialogmapStateToProps-title">Add New User</DialogTitle>
            {user && (
                <form 
                    className={classes.form}
                    onSubmit={handleSubmit(handleOk)}
                >
                    <Grid container spacing={5}>
                    {/* <Grid item xs={12}>
                        To add a user, please enter the email, name and tmporary password here.
                    </Grid> */}


                    <Grid item xs={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            defaultValue={user.email}
                            fullWidth
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="phone"
                            defaultValue={user.phone}
                            label="Phone Number"
                            type="phone"
                            fullWidth
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="username"
                            defaultValue={user.username}
                            label="Username"
                            type="text"
                            // value={model.username}
                            fullWidth
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            inputRef={register}
                        />
                    </Grid>

                    <Grid item xs={3}>
                    <FormGroup row>
                    <FormControlLabel
                        control={
                        <Switch
                            checked={user.status === 'A'}
                            onChange={e => handleStatusChange(e)}
                            name="Status"
                            color="primary"
                        />
                        }
                        label="Status"
                    />
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="mutiple-chip-label">Roles</InputLabel>
                            {
                            <Select multiple
                                labelId="mutiple-chip-label"
                                id="mutiple-chip"
                                value={user.roles}
                                onChange={handleRolesChange}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                            {
                            
                            Roles.map((name) => (
                                <MenuItem key={name} value={name} >
                                    <Checkbox checked={user.roles && user.roles.indexOf(name) !== -1}/>
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                            </Select>}
                        </FormControl>
                    </Grid>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
            </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
            </Button>
                    </DialogActions>
                    </Grid>
                </form>
            )}
        </div>
    );
}

UserFormPage.propTypes = {
    onSubmit: PropTypes.func,
    user: PropTypes.shape({
        _id: PropTypes.any,
        email: PropTypes.any,
        phone: PropTypes.any,
        username: PropTypes.any
    })
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(
    mapStateToProps,
    { createUser, updateUser, setUser }
)(UserFormPage);