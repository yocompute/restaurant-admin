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
import EmailSignupForm from '../../components/auth/EmailSignupForm';

import { signup } from '../../redux/auth/auth.actions'
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

const LocalSignupPage = ({isLoggedIn, signup}) => {
    const classes = useStyles();
    // const [type, setType] = useState("email");
    // const handleChange = (event, v) => {
    //     setType(v);
    // }

    const handleSignup = (data) => {
        signup(data);
    }

    // const handleSendCode = () => {

    // }

    return (
        <Container component="main" maxWidth="xs">
            {
                isLoggedIn
                    ? <Redirect from="/local-signup" to="/" />
                    :
            <div className={classes.paper}>
                {/* <Tabs variant="fullWidth" value={type} onChange={handleChange}>
                    <Tab value="email" label="Email" />
                    <Tab value="phone" label="Phone" />
                </Tabs> */}
                <Typography className={classes.titleRow} component="h1" variant="h5">
                    Sign up
                </Typography>
                <EmailSignupForm btnText="Sign up" onSubmit={handleSignup} />
                {/* {type === "email" && (
                    // <Box p={3}>
                    <EmailSignupForm btnText="Sign up" onSubmit={handleSignup} />
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

LocalSignupPage.propTypes = {
  isLoggedIn: PropTypes.any,
  signup: PropTypes.func
}
const mapStateToProps = state => ({
    isLoggedIn: selectTokenId(state),
});

export default connect(
    mapStateToProps,
    {
        signup
    }
)(LocalSignupPage);