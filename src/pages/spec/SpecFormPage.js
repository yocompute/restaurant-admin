import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// import { setSpec } from "../../redux/spec/spec.actions";
import { fetchBrands } from "../../redux/brand/brand.actions";

import {SpecOptions} from "../../components/spec/SpecOptions";
import {
    createSpec,
    updateSpec,
  } from "../../redux/spec/spec.actions";

const useStyles = makeStyles(() => ({
  formCtrl: {
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

function SpecFormPage({
  brands,
  // setSpec,
  fetchBrands,
  spec,
  updateSpec,
  createSpec,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [options, setOptions] = useState([]);
  const history = useHistory();
  const handleClose = () => {
    history.push('/specs');
  };
  const handleSave = (data, id) => {
    if (id) {
      updateSpec(data, id);
    } else {
      createSpec(data);
    }
  };
  const handleOk = (d) => {
    const data = {...d, options};
    handleSave(data, spec._id);
    history.push('/specs');
  };

  const handleOptionsChange = (list) => {
    setOptions(list);
  }

  return (
    <div
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Spec</DialogTitle>
      {spec && (
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogContent>
            <DialogContentText>
              To add a spec, please enter the name and description here.
            </DialogContentText>

            <Controller
              control={control}
              name="name"
              defaultValue={spec.name}
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

            <Controller
              control={control}
              name="description"
              defaultValue={spec.description}
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

            <FormControl className={classes.formCtrl}>
              <InputLabel id="spec-status-select-label">Status</InputLabel>
              <Controller
                control={control}
                name="status"
                defaultValue={spec.status}
                rules={{ required: true }}
                as={
                  <Select id="spec-status-select">
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

            <FormControl className={classes.formCtrl}>
              <InputLabel id="spec-brand-select-label">Brand</InputLabel>
              <Controller
                control={control}
                name="brand"
                defaultValue={spec.brand && spec.brand._id}
                rules={{ required: true }}
                as={
                  <Select id="spec-brand-select">
                    {brands &&
                      brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                  </Select>
                }
              />
            </FormControl>


            <SpecOptions options={spec.options} onChange={handleOptionsChange} />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>handleOk
        </form>
      )}

    </div>
  );
}

SpecFormPage.propTypes = {
  brands: PropTypes.shape({
    map: PropTypes.func
  }),
  fetchBrands: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  opened: PropTypes.any,
  spec: PropTypes.shape({
    _id: PropTypes.any,
    brand: PropTypes.shape({
      _id: PropTypes.any
    }),
    description: PropTypes.any,
    name: PropTypes.any,
    options: PropTypes.any,
    status: PropTypes.any
  })
}

const mapStateToProps = (state) => ({
  spec: state.spec,
  brands: state.brands,
});

export default connect(mapStateToProps, {
  // setSpec,
  fetchBrands,
  createSpec,
  updateSpec,
})(SpecFormPage);
