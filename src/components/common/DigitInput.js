import PropTypes from "prop-types";
import React, {useState} from 'react';

// import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';


const DigitInput = ({onChangeDigit}) => {
    const [a, setArray] = useState(['','','','']);

    const handleChange = (e, index) => {
        const b = [...a];
        b[index] = e.target.value;
        if(a[0] && a[1] && a[2] && a[3]){
            const s = `${a[0]}${a[1]}${a[2]}${a[3]}`;
            onChangeDigit(s);
        }
        setArray(b);
    }

    return (
        <Grid container>
            <Grid item xs={3}>
                <Box display="flex" flexDirection="row" p={1}>
                    <TextField onChange={e => handleChange(e, 0)} InputLabelProps={{ shrink: false }} inputProps={{maxLength: 1, min: 0, style: { textAlign: 'center' }}} />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box display="flex" flexDirection="row" p={1}>
                    <TextField onChange={e => handleChange(e, 1)} InputLabelProps={{ shrink: false }} inputProps={{maxLength: 1, min: 0, style: { textAlign: 'center' }}} />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box display="flex" flexDirection="row" p={1}>
                    <TextField onChange={e => handleChange(e, 2)} InputLabelProps={{ shrink: false }} inputProps={{maxLength: 1, min: 0, style: { textAlign: 'center' }}} />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box display="flex" flexDirection="row" p={1}>
                    <TextField onChange={e => handleChange(e, 3)} InputLabelProps={{ shrink: false }} inputProps={{maxLength: 1, min: 0, style: { textAlign: 'center' }}} />
                </Box>
            </Grid>
        </Grid>
    )
}

DigitInput.propTypes = {
  onChangeDigit: PropTypes.func
}

export default DigitInput;