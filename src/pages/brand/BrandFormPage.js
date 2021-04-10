import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImageUploader from "react-images-upload";
import { makeStyles } from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { setBrand, createBrand, updateBrand } from "../../redux/brand/brand.actions";
import { fetchUsers } from "../../redux/user/user.actions";

import BrandApi from "../../services/BrandApi";
import ImageViewer from "../../components/common/ImageViewer";
import BusinessHoursSetting from "../../components/common/BusinessHoursSetting";
import { DEFAULT_BUSINESS_HOURS } from "./BrandListPage";

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

function BrandFormPage({
  users,
  setBrand,
  fetchUsers,
  brand,
  updateBrand,
  createBrand,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const history = useHistory();

  const handleClose = () => {
    history.push('/brands');
  };
  const handleSave = (data, id) => {
    const d = {...data, deliverMethods: brand.deliverMethods, businessHours: brand.businessHours};
    if (id) {
      updateBrand(d, id);
    } else {
      createBrand(d);
    }
  };
  const handleOk = (d) => {
    handleSave(d, brand._id);
    history.push('/brands');
  };

  const handleRemovePicture = () => {
    const confirm = window.confirm("Do you really want to remove this image?");
    if (confirm) {
      const newModel = { ...brand };
      newModel.pictures.splice(0, 1);
      setBrand(newModel);
    }
  };

  const handleUpload = (picture) => {
    let file = picture;
    if (Array.isArray(file)) {
      file = file[0];
    }
    BrandApi.upload(file, brand._id).then((brand) => {
      if (brand) {
        setBrand({ ...brand });
      } else {
        // setAlert({
        //   message: t("Upload failed"),
        //   severity: "error"
        // });
      }
    });
  };

  const hasDeliverMethod = (method) => {
    if (brand.deliverMethods) {
      return brand.deliverMethods.indexOf(method) !== -1;
    } else {
      return false;
    }
  }

  const handleDeliverMethodChange = (event) => {
    const name = event.target.name;
    if (event.target.checked) {
      if (brand.deliverMethods) {
        if (brand.deliverMethods.indexOf(name) === -1) {
          const deliverMethods = [...brand.deliverMethods, name];
          setBrand({ ...brand, deliverMethods });
        }
      } else {
        setBrand({ ...brand, deliverMethods: [name] });                        
        if (brand.deliverMethods) {
          if (brand.deliverMethods.indexOf(name) !== -1) {
            const deliverMethods = brand.deliverMethods.filter(dm => dm !== name);
            setBrand({ ...brand, deliverMethods });
          }
        } else {
          setBrand({ ...brand, deliverMethods: [] });
        }
      }
    }
  }


  const handleWeekdayChange = (e) => {
    const day = e.target.name;
    const checked = e.target.checked;
    const businessHours = { ...brand.businessHours };
    businessHours[day].opening = checked;

    setBrand({...brand, businessHours});
  }

  const handleStartChange = (e) => {
    const day = e.target.name;
    const v = e.target.value;
    const businessHours = { ...brand.businessHours };
    businessHours[day].start = v;
  
    setBrand({...brand, businessHours});
  }
  
  const handleEndChange = (e) => {
    const day = e.target.name;
    const v = e.target.value;
    const businessHours = { ...brand.businessHours };
    businessHours[day].end = v;
  
    setBrand({...brand, businessHours});
  }
 

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h2>{brand._id? "Edit Brand":"Add New Brand"}</h2>
      {brand && (
        <form onSubmit={handleSubmit(handleOk)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              To add a brand, please enter the name and description here.
            </Grid >

            <Grid item xs={3}>
              <Controller
                control={control}
                name="name"
                defaultValue={brand.name}

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

            <Grid item xs={3}>
              <FormControl className={classes.formCtrl}>
                <InputLabel id="brand-status-select-label">Status</InputLabel>
                <Controller
                  control={control}
                  name="status"
                  defaultValue={brand.status}
                  rules={{ required: true }}
                  as={
                    <Select id="brand-status-select" value={brand.status}>
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
                <InputLabel id="brand-owner-select-label">Owner</InputLabel>
                <Controller
                  control={control}
                  name="owner"
                  defaultValue={brand.owner && brand.owner._id}
                  rules={{ required: true }}
                  as={
                    <Select id="brand-owner-select">
                      {users &&
                        users.map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            {user.username}
                          </MenuItem>
                        ))}
                    </Select>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="description"
                defaultValue={brand.description}
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
              <div>Deliver Method:</div>
              <FormGroup>

                <FormControlLabel
                  control={<Checkbox checked={hasDeliverMethod("P")} onChange={handleDeliverMethodChange} name="P" />}
                  label="Platform Delivery"
                />
                <FormControlLabel
                  control={<Checkbox checked={hasDeliverMethod("M")} onChange={handleDeliverMethodChange} name="M" />}
                  label="Merchant Delivery"
                />
                <FormControlLabel
                  control={<Checkbox checked={hasDeliverMethod("V")} onChange={handleDeliverMethodChange} name="V" />}
                  label="Vendor Delivery"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={3}>
              <Controller
                control={control}
                name="maxDeliverDistance"
                defaultValue={brand.maxDeliverDistance}

                as={
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Max deliver distance(KM)"
                    type="number"Phone Number
                    fullWidth
                  />
                }
              />
            </Grid>


            <Grid item xs={3}>
              <Controller
                control={control}
                name="minConsumption"
                defaultValue={brand.minConsumption}

                as={
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Starting Amount(CAD)"
                    type="number"
                    fullWidth
                  />
                }
              />
            </Grid>

            <Grid item xs={12}>
              <h4>Business Hours:</h4>
                <BusinessHoursSetting 
                  businessHours={brand.businessHours}
                  onWeekdayChange={handleWeekdayChange}
                  onStartChange={handleStartChange}
                  onEndChange={handleEndChange}
                />
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

      <div className={classes.uploadRow}>
        <div className={classes.uploadCol}>
          <ImageUploader
            withIcon={true}
            buttonText="Upload image"
            onChange={(picture) => handleUpload(picture)}
            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
            maxFileSize={5242880}
          />
        </div>
        <div className={classes.imageCol}>
          <ImageViewer
            url={
              brand && brand.pictures && brand.pictures.length > 0
                ? brand.pictures[0].url
                : ""
            }
            onRemove={handleRemovePicture}
          />
        </div>
      </div>
    </div>
  );
}

BrandFormPage.propTypes = {
  brand: PropTypes.shape({
    _id: PropTypes.any,
    description: PropTypes.any,
    name: PropTypes.any,
    owner: PropTypes.shape({
      _id: PropTypes.any
    }),
    pictures: PropTypes.shape({
      length: PropTypes.number
    }),
    status: PropTypes.any
  }),
  fetchUsers: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  opened: PropTypes.any,
  setBrand: PropTypes.func,
  users: PropTypes.shape({
    map: PropTypes.func
  })
}

function initBrand(brand){
  if(!brand.businessHours){
    return {...brand, businessHours: DEFAULT_BUSINESS_HOURS};
  }else{
    return brand;
  }
}

const mapStateToProps = (state) => ({
  brand: initBrand(state.brand),
  users: state.users,
});

export default connect(mapStateToProps, {
  setBrand,
  fetchUsers,
  createBrand,
  updateBrand,
})(BrandFormPage);
