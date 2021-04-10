// import PropTypes from "prop-types";
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(() => ({
  resource: {
    width: "80px",
    padding: "18px 8px",
  },
}));
const Permission = ({ permission, onCheckChange }) => {
    const classes = useStyles();

    function hasAction(c){
        return permission.actions && permission.actions[c];
    }
    function getName(action){
        const m = {
            "c": "Create",
            "r": "Read",
            "u": "Update",
            "d": "Delete",
        };
        return `${m[action]}`;
    }
    return (
        <Grid container>
            <Box flexDirection="row" p={1} className={classes.resource}>
                {permission.resource}
            </Box>
            {
                ["c","r","u","d"].map(action =>
                    <Box flexDirection="row" p={1}>
                    <FormControlLabel
                        control={<Checkbox checked={hasAction(action)} onChange={(e) => onCheckChange(e)} name={`${permission.resource},${action}`} />}
                        label={getName(action)}
                    />
                </Box>
                )
            }
        </Grid>
    )
}



export default Permission;