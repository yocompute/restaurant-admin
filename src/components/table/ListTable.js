import React, { useState } from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
import {
  // Avatar,
  // Chip,
  Table,
  // TableCell,
  // TableContainer,
  TableBody,
  TableRow,
  // Switch,
  // IconButton,
} from "@material-ui/core";

// import EditIcon from "@material-ui/icons/Edit";

import TableHeader from "./TableHeader";
import ListCell from "./ListCell";

const ListTable = ({ label, defaultSort, columns, rows, onEditRow, onDeleteRow }) => {
  const [sort, setSort] = useState(defaultSort);

  const sorts = (a, b) => {
    return a.localeCompare(b);
  };

  const rowsSort = (rows) => {
    rows.sort((a, b) => {
      return (
        a[sort[0]] &&
        (sort[0] === "owner"
          ? sort[1] > 0
            ? sorts(a[sort[0]].username, b[sort[0]].username)
            : sorts(b[sort[0]].username, a[sort[0]].username)
          : sort[0] === "brand" || sort[0] === "category"
          ? sort[1] > 0
            ? sorts(a[sort[0]].name, b[sort[0]].name)
            : sorts(b[sort[0]].name, a[sort[0]].name)
          : typeof a[sort[0]] === "number"
          ? sort[1] > 0
            ? a[sort[0]] - b[sort[0]]
            : b[sort[0]] - a[sort[0]]
          : sort[1] > 0
          ? sorts(a[sort[0]], b[sort[0]])
          : sorts(b[sort[0]], a[sort[0]]))
      );
    });
    return rows;
  };

  return (
    <Table aria-label={label} size="small">
      <TableHeader data={columns} sort={sort} onSetSort={setSort} />
      <TableBody>
        {rows &&
          rows.length > 0 &&
          rowsSort(rows).map((row, idx) => (
            <TableRow key={`${row._id}_${idx}`}>
              {columns.map((col) => (
                <ListCell
                  key={col.field}
                  row={row}
                  col={col}
                  onEditRow={onEditRow}
                  onDeleteRow={onDeleteRow}
                />
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

ListTable.propTypes = {
  columns: PropTypes.shape({
    map: PropTypes.func
  }),
  defaultSort: PropTypes.any,
  label: PropTypes.any,
  onEditRow: PropTypes.any,
  rows: PropTypes.shape({
    length: PropTypes.number,
    sort: PropTypes.func
  })
}

export default ListTable;
