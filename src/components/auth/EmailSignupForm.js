import PropTypes from "prop-types";
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AgreementLink from './AgreementLink';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  btnWrap: {
    textDecoration: 'none',
    marginBottom: '25px'
  }
}));

const EmailSignupForm = ({ onSubmit, btnText }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        name="brand"
        label="Brand Name"
        variant="outlined"
        margin="normal"
        inputRef={register}
      />
      
      <TextField
        fullWidth
        name="username"
        label="Username"
        variant="outlined"
        margin="normal"
        inputRef={register}
      />

      <TextField
        fullWidth
        name="email"
        label="Email"
        variant="outlined"
        margin="normal"
        inputRef={register}
      />

      <TextField
        fullWidth
        type="password"
        name="password"
        label="Password"
        variant="outlined"
        margin="normal"
        inputRef={register}
      />

      <Grid item xs={12} sm={12}>
        <Box mt={3} mb={3}>
          <AgreementLink />
        </Box>
      </Grid>

      <div className={classes.btnWrap}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          {btnText}
        </Button>
      </div>


        <Grid container justify="flex-end">
          <Grid item>
            <Link variant="body2" to={"/local-login"}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>

    </form>
  )
}

EmailSignupForm.propTypes = {
  btnText: PropTypes.any,
  onSubmit: PropTypes.any
}

export default EmailSignupForm;