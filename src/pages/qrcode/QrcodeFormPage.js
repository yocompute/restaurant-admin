import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";

import { setQrcode } from "../../redux/qrcode/qrcode.actions";
import { fetchBrands } from "../../redux/brand/brand.actions";
import { updateQrcode, createQrcode} from "../../redux/qrcode/qrcode.actions";
import { CLIENT_HOST, QrcodeTag } from "../../const";
import {Role} from "../../const";
import { selectAuthUser, selectAuthRoles } from "../../redux/auth/auth.selectors";


var QRCode = require("qrcode-react");

const useStyles = makeStyles(() => ({
  formCtrl: {
    width: "100%",
  },
  qrcodeRow: {
    padding: "25px",
  },
  qrcodeCol: {
    width: "50%",
    float: "left",
  },
}));

function QrcodeFormPage({
  user,
  roles,
  qrcode,
  brands,
  setQrcode,
  fetchBrands,
  updateQrcode,
  createQrcode,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [val, setValue] = useState();
  // qrcode && qrcode._id && qrcode.brand ?
  // `${CLIENT_HOST}/${qrcode.brand}/${qrcode._id}` : null);
  const history = useHistory();
  const handleClose = () => {
    history.push('/qrcodes');
  };
  const handleSave = (data, id) => {
    if (id) {
      updateQrcode(data, id);
    } else {
      createQrcode(data);
    }
  };
  const handleOk = (d) => {
    handleSave(d, qrcode._id);
    history.push('/qrcodes');
  };

  const handleBrandChange = (e) => {
    const newModel = { ...qrcode };
    newModel.brand = e.target.value;
    setQrcode(newModel);
    setValue(`${CLIENT_HOST}/?brandId=${e.target.value}&qrcode=${qrcode._id}`);
  };

  // const handleStatusChange = (e) => {
  //   const newModel = { ...qrcode };
  //   newModel.status = e.target.value;
  //   setQrcode(newModel);
  // };

  useEffect(() => {
    if (qrcode && qrcode._id && qrcode.brand) {
      setValue(`${CLIENT_HOST}/?brandId=${qrcode.brand._id}&qrcode=${qrcode._id}`);
    }
  }, [qrcode]);

  useEffect(() => {
    if(!roles){
      return;
    }
    if(roles.indexOf(Role.Super) !== -1){
      fetchBrands();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchBrands({owner: user._id});
    }else{
      
    }
  }, [fetchBrands]);

  return (
    <div className={classes.root}>
      <h3 id="form-dialog-title">Add New Qrcode</h3>
      {qrcode && (
        <form onSubmit={handleSubmit(handleOk)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
            <h5>
              To add a qrcode, please enter the name and description here.
            </h5>
            </Grid>
            <Grid item xs={3}>
            <Controller
              control={control}
              name="name"
              defaultValue={qrcode.name}
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="name"
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
              defaultValue={qrcode.description}
              as={
                <TextField
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
            <FormControl className={classes.formCtrl}>
              <InputLabel id="qrcode-status-select-label">Status</InputLabel>
              <Controller
                control={control}
                name="status"
                defaultValue={qrcode.status}
                rules={{ required: true }}
                as={
                  <Select
                    id="qrcode-status-select"
                    // onChange={handleStatusChange}
                  >
                    <MenuItem key={"A"} value={"A"}>
                      Active
                    </MenuItem>
                    <MenuItem key={"I"} value={"I"}>
                      Inactive
                    </MenuItem>
                  </Select>
                }
              />
            </FormControl>
                </Grid>
                <Grid item xs={3}>
            <FormControl className={classes.formCtrl}>
              <InputLabel id="qrcode-brand-select-label">Brand</InputLabel>
              <Controller
                control={control}
                name="brand"
                rules={{ required: true }}
                defaultValue={qrcode.brand && qrcode.brand._id}
                render={({ onChange, value }) => (
                  <Select
                    id="qrcode-brand-select"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      handleBrandChange(e);
                      return e;
                    }}
                  >
                    {brands &&
                      brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl className={classes.formCtrl}>
                <InputLabel id="qrcode-tag-select-label">Tag</InputLabel>
                <Controller
                  control={control}
                  name="tag"
                  defaultValue={qrcode.tag}
                  rules={{ required: true }}
                  as={
                    <Select
                      id="qrcode-tag-select"
                    >
                      <MenuItem key={"D"} value={QrcodeTag.Dine}>
                        Dine
                      </MenuItem>
                      <MenuItem key={"T"} value={QrcodeTag.Takeaway}>
                        Takeaway
                      </MenuItem>
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
      )}

      <div className={classes.qrcodeRow}>
        <div className={classes.qrcodeCol}>{val && <QRCode value={val} />}</div>
      </div>
    </div>
  );
}

QrcodeFormPage.propTypes = {
  brands: PropTypes.shape({
    map: PropTypes.func
  }),
  fetchBrands: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  opened: PropTypes.any,
  qrcode: PropTypes.shape({
    _id: PropTypes.any,
    brand: PropTypes.shape({
      _id: PropTypes.any
    }),
    description: PropTypes.any,
    name: PropTypes.any,
    status: PropTypes.any
  }),
  setQrcode: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: selectAuthUser(state),
  roles: selectAuthRoles(state),
  qrcode: state.qrcode,
  brands: state.brands,
});

export default connect(mapStateToProps, {
  setQrcode,
  fetchBrands,
  updateQrcode,
  createQrcode
})(QrcodeFormPage);
