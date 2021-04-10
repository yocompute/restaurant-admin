import PropTypes from "prop-types";
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const DEFAULT_HOUR = { opening: false, start: '', end: '' };

const OperationInput = ({ day, operation, onCheckChange, onStartChange, onEndChange }) => {


    return (
        <Grid container>
            <Box flexDirection="row" p={1}>
                <FormControlLabel
                    control={<Checkbox checked={operation.opening} onChange={onCheckChange} name={day} />}
                    label={day}
                />
            </Box>

            {
                operation.opening &&
                <Box flexDirection="row" p={1}>
                    <TextField
                        id="start"
                        name={day}
                        label="Opening"
                        type="time"
                        defaultValue={operation.start}
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }} HoursSetting
                        onChange={onStartChange}
                    />
                </Box>
            }

            {
                operation.opening &&
                <Box flexDirection="row" p={1}>
                    <TextField
                        id="end"
                        name={day}
                        label="Closing"
                        type="time"
                        defaultValue={operation.end}
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        onChange={onEndChange}
                    />
                </Box>
            }
        </Grid>
    )
}

const BusinessHoursSetting = ({ businessHours, onWeekdayChange, onStartChange, onEndChange}) => {

    return ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(d =>
        <OperationInput 
            day={d} operation={businessHours ? businessHours[d] : DEFAULT_HOUR}
            onCheckChange={onWeekdayChange}
            onStartChange={onStartChange}
            onEndChange={onEndChange}
        />
    )
}
OperationInput.propTypes = {
    onChangeDigit: PropTypes.func
}

export default BusinessHoursSetting;