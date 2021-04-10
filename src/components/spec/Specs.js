
import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
// import { v4 as uuidv4 } from 'uuid';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { ProductSpec } from "./ProductSpec";
import { setSpec, fetchSpecs } from "../../redux/spec/spec.actions";


const useStyles = makeStyles(() => ({
    root: {
        marginTop: '40px',
    },
    addOptionRow: {
        padding: '10px',
        // width: '100%',
    },
    specSelect: {
        width: '300px',
    },
    addButton: {
        width: '150px',
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


const Specs = ({ fetchSpecs, setSpec, spec, specs, productSpecs, onChange }) => {
    const classes = useStyles();
    const [list, setList] = useState(productSpecs ? productSpecs : []);

    useEffect(() => {
        fetchSpecs();
    }, [fetchSpecs]);

    const handleChange = (spec) => {
        const specs = [];
        list.forEach(it => {
            if (it._id === spec._id) {
                specs.push(spec);
            } else {
                specs.push(it)
            }
        });
        setList(specs);
        onChange(specs);
        //   const v = e.target.value;
        //   setName(v);
    }

    const handleAdd = () => {
        if (list && !list.find(it => it._id === spec._id)) {
            const newList = [...list, spec];
            setList(newList);
            onChange(newList);
        }
    }

    const handleRemove = (spec) => {
        const newList = list.filter(it => it._id !== spec._id);
        setList(newList);
        onChange(newList);
    }

    const handleSpecSelect = (e) => {
        const _id = e.target.value;
        const spec = specs.find(s => s._id === _id);
        setSpec(spec);
    }



    return (
        <div className={classes.root}>
            <div>Manage Specs:</div>
            <FormControl className={classes.addOptionRow}>

                <Select id="spec-select" onChange={handleSpecSelect} className={classes.specSelect}>
                    {specs &&
                        specs.map((spec) => (
                            <MenuItem key={spec._id} value={spec._id}>
                                {spec.name}
                            </MenuItem>
                        ))}
                </Select>

                <Button
                    className={classes.addButton}
                    size="medium"
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
                list &&
                list.map(it => (
                    <div key={it._id}>
                        <ProductSpec spec={it} onChange={handleChange} onRemove={handleRemove} />
                    </div>
                ))
            }
        </div>
    )
}

Specs.propTypes = {
    fetchSpecs: PropTypes.func,
    onChange: PropTypes.func,
    productSpecs: PropTypes.any,
    setSpec: PropTypes.func,
    spec: PropTypes.shape({
        _id: PropTypes.any,
        name: PropTypes.any
    }),
    specs: PropTypes.shape({
        find: PropTypes.func,
        map: PropTypes.func,
        push: PropTypes.func
    })
}

const mapStateToProps = (state) => ({
    spec: state.spec,
    specs: state.specs,
});

export default connect(mapStateToProps, {
    setSpec,
    fetchSpecs,
})(Specs);
