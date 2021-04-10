import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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
import { createRole, updateRole, setRole } from "../../redux/role/role.actions";
import theme from "../../theme";

import { makeStyles } from "@material-ui/core/styles";
// import { Roles } from "../../const";
import Permission from "../../components/common/Permission";

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
}));

function RoleFormPage({ role, createRole, updateRole, setRole }) {
    const { control, handleSubmit } = useForm();
    const history = useHistory();
    const classes = useStyles();

    const handleClose = () => {
        history.push('/roles');
    };

    const handleSave = (data, id) => {
        const d = {...data, status: role.status, permissions: role.permissions};
        if (id) {
            updateRole(d, id);
        } else {
            createRole(d);
        }
    };

    const handleOk = (d) => {
        handleSave(d, role._id);
        history.push('/roles');
    };

    const handleStatusChange = (d) => {
        setRole({...role, status: d.target.checked? 'A': 'I'});
    }

    const handlePermissionChange = (event) => {
        const [res, name] = event.target.name.split(',');
        const v = event.target.checked;

        const permissions = [...role.permissions];
        permissions.forEach(p => {
            if(p.resource === res){
                p.actions[name] = event.target.checked;
            }
        });
        setRole({...role, permissions});
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>Add New Role</div>
            {role && (
                <form 
                    className={classes.form}
                    onSubmit={handleSubmit(handleOk)}
                >
                    <Grid container spacing={5}>

                    <Grid item xs={3}>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue={role.name}

                            as={
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                            />
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="description"
                            defaultValue={role.description}
                            as={
                            <TextField
                                multiline
                                autoFocus
                                margin="dense"
                                label="Description"
                                type="text"
                                fullWidth
                            />
                            }
                        />
                        </Grid>


                    <Grid item xs={3}>
                    <FormGroup row>
                    <FormControlLabel
                        control={
                        <Switch
                            checked={role.status === 'A'}
                            onChange={e => handleStatusChange(e)}
                            name="Status"
                            color="primary"
                        />
                        }
                        label="Status"
                    />
                    </FormGroup>
                    </Grid>

                    {
                        role.permissions && role.permissions.length > 0 &&
                        role.permissions.map(p => <Permission permission={p} onCheckChange={(e) => handlePermissionChange(e)}/>)
                    }
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

RoleFormPage.propTypes = {
    onSubmit: PropTypes.func,
    role: PropTypes.shape({
        _id: PropTypes.any,
        email: PropTypes.any,
        phone: PropTypes.any,
        rolename: PropTypes.any
    })
}



function initRole(role){
    const permissions = [];
    ['role', 'user', 'brand', 'category', 'qrcode', 'spec', 'product', 'payment'].forEach(resource => {
        if(role.permissions){
            const perm = role.permissions.find(p => p.resource === resource);
            if(!perm){
                permissions.push({resource, actions: {}});
            }else{
                permissions.push(perm);
            }
        }else{
            permissions.push({resource, actions: {}});
        }
    });
    return {...role, permissions};
  }

const mapStateToProps = (state) => ({
    role: initRole(state.role),
})

export default connect(
    mapStateToProps,
    { createRole, updateRole, setRole }
)(RoleFormPage);