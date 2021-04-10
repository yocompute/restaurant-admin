import PropTypes from "prop-types";
import React, {  useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";

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

import ProductApi from "../../services/ProductApi";
import ImageViewer from "../../components/common/ImageViewer";
import Specs from "../../components/spec/Specs";
import { fetchBrands } from "../../redux/brand/brand.actions";
import { fetchCategories } from "../../redux/category/category.actions";
import { fetchAdditions, setProduct, updateProduct, createProduct } from "../../redux/product/product.actions";
import Additions from "../../components/product/Additions";
import { selectAdditions } from "../../redux/product/product.selectors";
import { selectAuthRoles, selectAuthUser } from "../../redux/auth/auth.selectors";
import { Role } from "../../const";
const useStyles = makeStyles(() => ({
  root:{
    height: "100%"
  },
  formCtrl: {
    width: window.matchMedia(`(max-width: 768px)`).matches ? "100%" : "22%",
    paddingRight: window.matchMedia(`(max-width: 768px)`).matches ? "0px" : "20px"
  },
  numberCtrl: {
    width: window.matchMedia(`(max-width: 768px)`).matches ? "100%" : "22%",
    paddingRight: window.matchMedia(`(max-width: 768px)`).matches ? "0px" : "20px"
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

function ProductFormPage({
  brand,
  roles,
  brands,
  categories,
  additions,
  updateProduct,
  createProduct,
  setProduct,
  fetchCategories,
  fetchAdditions,
  product,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const history = useHistory();
  // useEffect(() => {
  //   if (match.params && match.params.id) {
  //     const productId = match.params.id;
  //     setProduct({ _id: productId });
  //     fetchProducts({ productId });
  //   } else {
  //     const productId = DEFAULT_MERCHANT_ID;
  //     setMerchant({ _id: productId });
  //     fetchProducts({ productId });
  //   }
  // }, [fetchProducts]);


  const handleClose = () => {
    // onClose(false);
    history.push('/products');
  };
  const handleSave = (data, id) => {
    if (id) {
      updateProduct(data, id);
    } else {
      createProduct(data);
    }
  };

  const handleOk = (d) => {
    const ds = [];
    if(additions){
      additions.forEach(ad => {
        if(ad.checked){
          ds.push(ad._id);
        }
      });
    }

    const data = product.type === 'C' ? 
    { ...d, specs: product.specs, additions: ds, type: product.type } 
    : { ...d, specs: product.specs, type: product.type, additions: null };

    handleSave(data, product._id);
    // onClose(false);
    history.push('/products');
  };

  const handleRemovePicture = () => {
    const confirm = window.confirm("Do you really want to remove this image?");
    if (confirm) {
      const newModel = { ...product };
      newModel.pictures.splice(0, 1);
      setProduct(newModel);
    }
  };

  const handleUpload = (picture) => {
    let file = picture;
    if (Array.isArray(file)) {
      file = file[0];
    }
    ProductApi.upload(file, product._id).then((product) => {
      if (product) {
        setProduct({ ...product });
      } else {
        // setAlert({
        //   message: t("Upload failed"),
        //   severity: "error"
        // });
      }
    });
  };

  const handleSpecsChange = (specs) => {
    const newModel = { ...product, specs };
    setProduct(newModel);
  }

  const handleAdditionsChange = (datas) => {
    const additions = [];
    if (datas && datas.length > 0) {
      datas.forEach(d => {
        if (d.checked) {
          additions.push(d);
        }
      })
    }
    const newModel = { ...product, additions };
    setProduct(newModel);
  }

  const handleTypeChange = (e) => {
    const type = e.target.value;
    if(type !== 'C'){
      const newModel = { ...product, type, additions: null };
      setProduct(newModel);
    }else{
      const newModel = { ...product, type };
      setProduct(newModel);
    }
  }

  useEffect(() => {
    if(roles.indexOf(Role.Super) !== -1){
      fetchCategories();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchCategories({brand: brand._id});
    }
  }, [fetchCategories]);


  useEffect(() => {
    if(roles.indexOf(Role.Super) !== -1){
      fetchAdditions();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchAdditions({brand: brand._id});
    }
  }, [fetchAdditions]);

  return (
    <div className={classes.root}>
      <div id="form-dialog-title">Add New Product</div>
      {product && (
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogContent>
            <DialogContentText>
              To add a product, please enter the name and description here.
            </DialogContentText>

            <Controller
              control={control}
              name="name"
              defaultValue={product.name}
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

            <Controller
              control={control}
              name="description"
              defaultValue={product.description}
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

            <Controller
              className={classes.numberCtrl}
              control={control}
              name="price"
              defaultValue={product.price}
              type="number"
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="Price"
                  type="text"
                  fullWidth
                />
              }
            />

            <Controller
              className={classes.numberCtrl}
              control={control}
              name="cost"
              defaultValue={product.cost}
              type="number"
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="Cost"
                  type="text"
                  fullWidth
                />
              }
            />

            <Controller
              className={classes.numberCtrl}
              control={control}
              name="purchaseTaxRate"
              defaultValue={product.purchaseTaxRate}
              type="number"
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="Purchase Tax Rate"
                  type="text"
                  fullWidth
                />
              }
            />

            <Controller
              className={classes.numberCtrl}
              control={control}
              name="saleTaxRate"
              defaultValue={product.saleTaxRate}
              type="number"
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="Sale Tax Rate"
                  type="text"
                  fullWidth
                />
              }
            />
            <FormControl className={classes.formCtrl}>
              <InputLabel id="product-type-select-label">Type</InputLabel>
              {/* <ControllerfetchCategoriesSuccess
                control={control}
                name="type"
                defaultValue={product.type ? product.type : 'S'}
                rules={{ required: true }}
                as={ */}
                  <Select id="product-type-select"
                    defaultValue={product && product.type ? product.type : 'S'}
                    value={product && product.type ? product.type : 'S'}
                    onChange={handleTypeChange}
                    >
                    <MenuItem key={"S"} value={"S"}>
                      Single
                    </MenuItem>
                    <MenuItem key={"C"} value={"C"}>
                      Compound
                    </MenuItem>
                    <MenuItem key={"A"} value={"A"}>
                      Addition
                    </MenuItem>
                  </Select>
                {/* }
              /> */}
            </FormControl>
            <FormControl className={classes.formCtrl}>
              <InputLabel id="product-status-select-label">Status</InputLabel>
              <Controller
                control={control}
                name="status"
                defaultValue={product.status}
                rules={{ required: true }}
                as={
                  <Select id="product-status-select">
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
              <InputLabel id="product-category-select-label">
                Category
              </InputLabel>
              <Controller
                control={control}
                name="category"
                defaultValue={product.category && product.category._id}
                rules={{ required: true }}
                as={
                  <Select id="product-category-select">
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                }
              />
            </FormControl>

            <FormControl className={classes.formCtrl}>
              <InputLabel id="product-brand-select-label">Owner</InputLabel>
              <Controller
                control={control}
                name="brand"
                defaultValue={product.brand && product.brand._id}
                rules={{ required: true }}
                as={
                  <Select id="product-brand-select">
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

            {
              additions && product && product.type === 'C' &&
              <Additions data={additions} onChange={handleAdditionsChange} />
            }

            {/* <Specs productSpecs={product.specs} onChange={handleSpecsChange} /> */}
          </DialogContent>

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
              product && product.pictures && product.pictures.length > 0
                ? product.pictures[0].url
                : ""
            }
            onRemove={handleRemovePicture}
          />
        </div>
      </div>
    </div>
  );
}

ProductFormPage.propTypes = {
  additions: PropTypes.shape({
    forEach: PropTypes.func,
    push: PropTypes.func
  }),
  brands: PropTypes.shape({
    map: PropTypes.func
  }),
  categories: PropTypes.shape({
    map: PropTypes.func
  }),
  createProduct: PropTypes.func,
  fetchBrands: PropTypes.func,
  fetchCategories: PropTypes.func,
  opened: PropTypes.any,
  product: PropTypes.shape({
    _id: PropTypes.any,
    brand: PropTypes.shape({
      _id: PropTypes.any
    }),
    category: PropTypes.shape({
      _id: PropTypes.any
    }),
    cost: PropTypes.any,
    description: PropTypes.any,
    name: PropTypes.any,
    pictures: PropTypes.shape({
      length: PropTypes.number
    }),
    price: PropTypes.any,
    purchaseTaxRate: PropTypes.any,
    saleTaxRate: PropTypes.any,
    specs: PropTypes.any,
    status: PropTypes.any,
    type: PropTypes.string
  }),
  setProduct: PropTypes.func,
  updateProduct: PropTypes.func
}

const mapStateToProps = (state) => ({
  brand: state.brand,
  roles: selectAuthRoles(state),
  brands: state.brands,
  categories: state.categories,
  product: state.product,
  additions: selectAdditions(state)
});

export default connect(mapStateToProps, {
  fetchBrands,
  fetchCategories,
  setProduct,
  updateProduct,
  createProduct,
  fetchAdditions
})(ProductFormPage);
