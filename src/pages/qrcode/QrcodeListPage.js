import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

// import Header from '../../components/common/Header'
import ListTable from "../../components/table/ListTable";

import {
  fetchQrcodes,
  setQrcode,
} from "../../redux/qrcode/qrcode.actions";
import { selectAuthRoles } from "../../redux/auth/auth.selectors";
import { Role } from "../../const";
import { useHistory } from "react-router-dom";

const columns = [
  { field: "createUTC", label: "Created Date", type: "date" },
  { field: "name", label: "Qrcode name" },
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

const defaultSort = ["createUTC", -1];

const DEFAULT_QRCODE = {
  _id: "",
  createUTC: "",
  name: "",
  description: "",
  status: "",
  tag: "",
  brand: "",
  actions: "",
};

const QrcodeListPage = ({
  roles,
  brand,
  setQrcode,
  fetchQrcodes,
  qrcodes,
}) => {
  const history = useHistory();
  useEffect(() => {
    if(roles.indexOf(Role.Super) !== -1){
      fetchQrcodes();
    }else if(roles.indexOf(Role.Admin) !== -1){
      fetchQrcodes({brand: brand._id});
    }
  }, [fetchQrcodes]);


  const handleOpenQrcodeForm = () => {
    setQrcode(DEFAULT_QRCODE);
    history.push('/qrcodes/new');
  };

  const handleEditRow = (row) => {
    setQrcode(row);
    setTimeout(() => {
      history.push(`/qrcodes/${row._id}`);
    }, 100)
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenQrcodeForm}
      >
        Add
      </Button>

      {qrcodes && (
        <ListTable
          label="qrcode"
          defaultSort={defaultSort}
          columns={columns}
          rows={qrcodes}
          onEditRow={handleEditRow}
        />
      )}
    </div>
  );
};

QrcodeListPage.propTypes = {
  fetchQrcodes: PropTypes.func,
  qrcode: PropTypes.any,
  qrcodes: PropTypes.any,
  setQrcode: PropTypes.func,
}

const mapStateToProps = (state) => ({
  roles: selectAuthRoles(state),
  brand: state.brand,
  qrcode: state.qrcode,
  qrcodes: state.qrcodes,
});

export default connect(mapStateToProps, {
  setQrcode,
  fetchQrcodes,
})(QrcodeListPage);
