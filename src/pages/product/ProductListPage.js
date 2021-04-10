import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

// import Header from '../../components/common/Header'
import ListTable from "../../components/table/ListTable";
// import ProductFormPage from "./ProductFormPage";

import {
  setProduct,
  fetchProducts,
  fetchAdditions
} from "../../redux/product/product.actions";

import { selectAuthRoles } from "../../redux/auth/auth.selectors";
import { Role } from "../../const";

const columns = [
  { field: "createUTC", label: "Created Date", type: "date" },
  { field: "pictures", label: "Picture", type: "picture" },
  { field: "name", label: "Product Name" },
  { field: "description", label: "Description" },
  { field: "price", label: "Price" },
  { field: "cost", label: "Cost" },
  { field: "purchaseTaxRate", label: "Purchase Tax Rate" },
  { field: "saleTaxRate", label: "Sale Tax Rate" },
  { field: "status", label: "Status" },
  {
    field: "brand",
    label: "Brand",
    type: "object",
    property: "name",
  },
  {
    field: "category",
    label: "Category",
    type: "object",
    property: "name",
  },
  // { field: "attribute", label: "Attribute" },
  { field: "actions", label: "Actions" },
];

const defaultSort = ["createUTC", -1];

const DEFAULT_PRODUCT = {
  _id: "",
  createUTC: "",
  pictures: [],
  name: "",
  description: "",
  price: "",
  cost: "",
  purchaseTaxRate: "",
  saleTaxRate: "",
  status: "",
  brand: "",
  category: "",
};

const ProductListPage = ({
  roles,
  brand,
  products,
  // additions,
  setProduct,
  fetchProducts,
  fetchAdditions
}) => {
  const history = useHistory();

  const handleNewProductFormPage = () => {
    setProduct(DEFAULT_PRODUCT);
    // setDialogOpen(true);
    history.push("/products/new");
  };

  const handleEditRow = (row) => {
    setProduct(row);
    // fetchAdditions({brand: row.brand._id});
    // setDialogOpen(true);
    setTimeout(() => {
      history.push(`/products/${row._id}`);
    }, 100)
  };


  useEffect(() => {
    if(roles.indexOf(Role.Super) !== -1){
      fetchProducts();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchProducts({brand: brand._id});
    }
  }, [fetchProducts]);

  
  return (
    <div>
      <Button data-testid="add-btn"
        variant="contained"
        color="primary"
        onClick={handleNewProductFormPage}
      >
        Add
      </Button>

      {products && (
        <ListTable
          label="product"
          defaultSort={defaultSort}
          columns={columns}
          rows={products}
          onEditRow={handleEditRow}
        />
      )}
    </div>
  );
};

ProductListPage.propTypes = {
  fetchAdditions: PropTypes.func,
  fetchProducts: PropTypes.func,
  products: PropTypes.any,
  setProduct: PropTypes.func,
}

const mapStateToProps = (state) => ({
  roles: selectAuthRoles(state),
  brand: state.brand,
  products: state.products,
  // additions: state.additions
});

export default connect(mapStateToProps, {
  setProduct,
  fetchProducts,
  // createProduct,
  // updateProduct,
  fetchAdditions
})(ProductListPage);
