import React from "react";

import {
    Avatar,
    TableCell,
    IconButton
} from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

const ListCell = ({ col, row, onEditRow, onDeleteRow }) => {
    // const [data, setData] = useState(row ? row[col.field] : null);
    const data = row ? row[col.field] : null;

    const handleEdit = () => {
        onEditRow(row);
    }

    const handleDelete = () => {
        onDeleteRow(row);
    }

    const toDateString = (s) => {
        const d = s.split('T');
        return d ? d[0] : '';
    }

    if (col.field !== 'actions' && !data) {
        return <TableCell key={col.field} />
    } else {
        if (col.type === 'image') {
            return (
                <TableCell key={col.field}>
                    <Avatar
                        variant="square"
                        alt="user"
                    // src={`${data.length > 0 ? data[0].url : "#"}`}
                    >
                    </Avatar>
                </TableCell>
            )
        } else if (col.type === 'picture') {
            return <TableCell key={col.field}>
                <Avatar
                    variant="square"
                    alt="user"
                    src={data && data.length > 0 ? data[0].url : "/"}
                >
                </Avatar>
            </TableCell>
        } else if (col.field === 'actions') {
            return <TableCell key={col.field}>
                {
                    onEditRow &&
                    <IconButton aria-label="edit" onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                }
                {
                    onDeleteRow &&
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <ClearIcon />
                    </IconButton>
                }

            </TableCell>
        } else if (col.type === 'object') {
            return <TableCell key={col.field}>
                {data[col.property]}
            </TableCell>
        } else if(col.type === 'date'){
            return (
                <TableCell key={col.field}>
                    {toDateString(data ? data : '')}
                </TableCell>
            )
        } else {
            return (
                <TableCell key={col.field}>
                    {data ? data : ''}
                </TableCell>
            )

        }
    }
}

export default ListCell;