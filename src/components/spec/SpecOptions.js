
import PropTypes from "prop-types";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { SpecOption } from "./SpecOption";

const useStyles = makeStyles(() => ({
  root:{
    marginTop: '40px',
  },
  addOptionRow:{
    padding: '10px',
  },
  quantityCtrl: {
    width: '150px'
  },
  increaseBtn: {
    width: '30px',
    height: '30px',
    float: 'left'
  },
  decreasebtn: {
    width: '30px',
    height: '30px',
    float: 'left'
  },
  quantityInput: {
    width: 'calc(100% - 80px)',
    float: 'left',
    height: '30px',
    border: '1px solid #888'
  }
}))


export const SpecOptions = ({ options, onChange }) => {
  const classes = useStyles();
  const [list, setList] = useState(options ? options : []);
  const [name, setName] = useState();

  const handleChange = (e) => {
    const v = e.target.value;
    setName(v);
  }

  const handleAdd = () => {
    const newList = [...list, { name, id: uuidv4() }];
    setList(newList);
    onChange(newList);
  }

  const handleRemove = (id) => {
    const newList = list.filter(it => it.id !== id);
    setList(newList);
    onChange(newList);
  }

  const handleSelect = (it) => {
    // const item = it;
    console.log(it);
  }

  return (
    <div className={classes.root}>
      <div>Manage Spec Options:</div>
            <FormControl className={classes.addOptionRow}>
              {/* <InputLabel id="product-type-select-label">Spec Option Name</InputLabel> */}
              {/* <input className={classes.name} type="text" value={name} onChange={handleChange} /> */}
              <TextField
                  autoFocus
                  margin="dense"
                  label="Option Name"
                  type="text"
                  fullWidth
                  value={name} onChange={handleChange}
                />



      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleAdd}
        >
        Add
      </Button>
        </FormControl>
      {
        list && list.length > 0 &&
        list.map(it => (
          <SpecOption
            key={it.id}
            item={it}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
        ))
      }
    </div>
  )
}
SpecOptions.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.any
}
