import React, { useState } from 'react';
// import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import DigitInput from '../../components/common/DigitInput';

const LocalSignupPage = () => {
    const [code, setVerificationCode] = useState("");

    const handleChange = (v) => {
        console.log(v);
        setVerificationCode(v);
    }

    const handleSubmit = () => {
        console.log(code);
    }

    return (
        <Container maxWidth="sm">
            <Paper variant="outlined">
                <Grid item xs={12} sm={12}>
                    <Box m={3}>
                        <DigitInput onChangeDigit={handleChange} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Box m={3}>
                        <Button variant="outlined" fullWidth={true} onClick={handleSubmit}>Next</Button>
                    </Box>
                </Grid>
            </Paper>
        </Container>
    )
}

export default LocalSignupPage;