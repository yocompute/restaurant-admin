import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { fetchBrands } from "../../redux/brand/brand.actions";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { updateCategory, createCategory} from "../../redux/category/category.actions";
import {Role} from "../../const";
import { selectAuthUser, selectAuthRoles } from "../../redux/auth/auth.selectors";

const useStyles = makeStyles(() => ({
  formCtrl: {
    width: "100%",
  },
}));

const CategoryFormPage = ({ user, roles, category, brands, fetchBrands, updateCategory, createCategory }) => {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    history.push('/categories');
  };

  const handleSave = (data, id) => {
    if (id) {
      updateCategory(data, id);
    } else {
      createCategory(data);
    }
  };
  
  const handleOk = (d) => {
    handleSave(d, category._id);
    history.push('/categories');
  };

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
      <h3 id="form-dialog-title">Add New Category</h3>
      {category && (
        <form onSubmit={handleSubmit(handleOk)}>
          <Grid container spacing={5}>
          <Grid item xs={12}>
            <h4>
              To add a category, please enter the name and description here.
            </h4>
            </Grid>
            <Grid item xs={3}>

            <Controller
              control={control}
              name="name"
              defaultValue={category.name}
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
              defaultValue={category.description}
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
              <InputLabel id="category-status-select-label">Status</InputLabel>
              <Controller
                control={control}
                name="status"
                defaultValue={category.status}
                rules={{ required: true }}
                as={
                  <Select id="category-status-select">
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
              <InputLabel id="category-brand-select-label">Brand</InputLabel>
              <Controller
                control={control}
                name="brand"
                rules={{ required: true }}
                defaultValue={category.brand && category.brand._id}
                as={
                  <Select id="category-brand-select">
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
    </div>
  );
};

CategoryFormPage.propTypes = {
  brands: PropTypes.shape({
    map: PropTypes.func
  }),
  category: PropTypes.shape({
    _id: PropTypes.any,
    brand: PropTypes.shape({
      _id: PropTypes.any
    }),
    description: PropTypes.any,
    name: PropTypes.any,
    status: PropTypes.any
  }),
  fetchBrands: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  opened: PropTypes.any
}

const mapStateToProps = (state) => ({
  user: selectAuthUser(state),
  roles: selectAuthRoles(state),
  category: state.category,
  brands: state.brands,
});

export default connect(mapStateToProps, { fetchBrands, updateCategory, createCategory })(CategoryFormPage);
