import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  tableHeaderCell: {
    cursor: "pointer",
  },
}));

const headerSort = [
  "createUTC",
  "name",
  "username",
  "email",
  "phone",
  "price",
  "cost",
  "brand",
  "category",
  "owner",
];

export const TableHeadCell = ({ sort, field, label, onSetSort }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const toggleSort = (fieldName) => {
    // sort only one field
    if (sort && sort[0] === fieldName) {
      onSetSort([fieldName, sort[1] === 1 ? -1 : 1]);
    } else {
      onSetSort([fieldName, 1]);
    }
  };

  const renderSortLabel = (fieldName) => {
    return (
      <TableSortLabel
        active={sort && sort[0] === fieldName}
        direction={sort && sort[1] === -1 ? "desc" : "asc"}
        // onClick={() => {
        //   toggleSort(fieldName);
        // }}
      ></TableSortLabel>
    );
  };

  return (
    <TableCell
      onClick={() => {
        toggleSort(field);
      }}
      className={headerSort.includes(field) ? classes.tableHeaderCell : ""}
    >
      {t(label)}
      {headerSort.includes(field) && renderSortLabel(field)}
    </TableCell>
  );
};

TableHeadCell.propTypes = {
  field: PropTypes.any,
  label: PropTypes.any,
  onSetSort: PropTypes.func,
  sort: PropTypes.any
}

// data --- [{field:x, label:x}]
const TableHeader = ({ data, sort, onSetSort }) => {
  return (
    <TableHead>
      <TableRow>
        {data &&
          data.length > 0 &&
          data.map((t) => (
            <TableHeadCell
              key={t.field}
              sort={sort}
              field={t.field}
              label={t.label}
              onSetSort={onSetSort}
            />
          ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  data: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  onSetSort: PropTypes.any,
  sort: PropTypes.any
}

export default TableHeader;
