import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ListTable from "../../components/table/ListTable";
import {
  setCategory,
  fetchCategories,
} from "../../redux/category/category.actions";
import Button from "@material-ui/core/Button";

import { selectAuthRoles, selectAuthUser } from "../../redux/auth/auth.selectors";
import { Role } from "../../const";
import { useHistory } from "react-router-dom";

const DEFAULT_CATEGORY = {
  _id: "",
  createUTC: "",
  imageUrl: "",
  name: "",
  description: "",
  status: "",
  brand: "",
  actions: "",
};

const columns = [
  { field: "createUTC", label: "Created Date", type: "date" },
  { field: "imageUrl", label: "Category Image", type: "image" },
  { field: "name", label: "Category Name" },
  { field: "description", label: "Description" },
  { field: "status", label: "Status" },
  {
    field: "brand",
    label: "Brand",
    type: "object",
    property: "name",
  },
  { field: "actions", label: "Actions" },
];

const defaultSort = ["createUTC", 1];

const CategoryListPage = ({
  roles,
  brand,
  categories,
  setCategory,
  fetchCategories,
}) => {
  const history = useHistory();

  useEffect(() => {
    setCategory(DEFAULT_CATEGORY);
  }, []);

  useEffect(() => {
    if(roles.indexOf(Role.Super) !== -1){
      fetchCategories();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchCategories({brand: brand._id});
    }
  }, [fetchCategories]);

  const handleOpenCategoryForm = () => {
    setCategory(DEFAULT_CATEGORY);
    history.push('/categories/new');
  };

  const handleEditRow = (row) => {
    setCategory(row);
    setTimeout(() => {
      history.push(`/categories/${row._id}`);
    }, 100)
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCategoryForm}
      >
        Add
      </Button>
      {categories && (
        <ListTable
          lable="category"
          columns={columns}
          rows={categories}
          defaultSort={defaultSort}
          onEditRow={handleEditRow}
        />
      )}
    </div>
  );
};

CategoryListPage.propTypes = {
  categories: PropTypes.any,
  fetchCategories: PropTypes.func,
  setCategory: PropTypes.func,
}

const mapStateToProps = (state) => ({
  roles: selectAuthRoles(state),
  brand: state.brand,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  setCategory,
  fetchCategories,
})(CategoryListPage);
