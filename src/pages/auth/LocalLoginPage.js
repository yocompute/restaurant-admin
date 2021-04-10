import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

// import PhoneForm from '../../components/auth/PhoneForm';
import EmailLoginForm from '../../components/auth/EmailLoginForm';

import { login } from '../../redux/auth/auth.actions';
import { selectTokenId } from '../../redux/auth/auth.selectors';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleRow: {
        marginTop: theme.spacing(6),
    }
}));

const LocalLoginPage = ({ isLoggedIn, login }) => {
    const classes = useStyles();
    // const [type, setType] = useState("email");
    // const handleChange = (event, v) => {
    //     setType(v);
    // }

    const handleSignIn = (data) => {
        login(data);
    }

    // const handleSendCode = () => {

    // }

    return (
        <Container component="main" maxWidth="xs">
            {
                isLoggedIn
                    ? <Redirect from="/local-login" to="/" />
                    :
                    <div className={classes.paper}>
                        {/* <Tabs variant="fullWidth" value={type} onChange={handleChange}>
                            <Tab value="email" label="Email" />
                            <Tab value="phone" label="Phone" />
                        </Tabs> */}
                        <Typography className={classes.titleRow} component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <EmailLoginForm btnText="Sign in" onSubmit={handleSignIn} />
                        {/* {type === "email" && (
                            // <Box p={3}>
                            <EmailLoginForm btnText="Sign in" onSubmit={handleSignIn} />
                            // </Box>
                        )}
                        {type === "phone" && (
                            // <Box p={3}>
                            <PhoneForm btnText="Send code" onSubmit={handleSendCode} />
                            // </Box>
                        )} */}
                    </div>
            }
        </Container>
    )
}

LocalLoginPage.propTypes = {
  isLoggedIn: PropTypes.any,
  login: PropTypes.func
}

const mapStateToProps = state => ({
    isLoggedIn: selectTokenId(state)
});

export default connect(
    mapStateToProps,
    {
        login
    }
)(LocalLoginPage);