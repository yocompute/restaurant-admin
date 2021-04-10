import PropTypes from "prop-types";
import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


export const AuthSelect = ({type}) => {
    return (
        <Container maxWidth="sm">
            <Paper variant="outlined">
                {
                    type === 'signup' ?
                    <div>Sign up for YePick</div>
                    :
                    <div>Login for YePick</div>
                }
            <Grid item xs={12} sm={12}>
                <Box m={3}>
                    <Link to={`local-${type}`} style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" fullWidth={true}>Use phone or email</Button>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Box m={3}>
                    <Button variant="outlined" fullWidth={true}>Continue with Facebook</Button>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Box m={3}>
                    <Button variant="outlined" fullWidth={true}>Continue with Google</Button>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Box m={3}>
                    <Button variant="outlined" fullWidth={true}>Continue with Twitter</Button>
                </Box>
            </Grid>
        </Paper>
        </Container>
    )
}
AuthSelect.propTypes = {
  type: PropTypes.string
}
