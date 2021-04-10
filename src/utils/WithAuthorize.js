import React from 'react';
import { connect } from "react-redux";
import { selectAuthRoles } from '../redux/auth/auth.selectors';
import { hasPermission } from './index';

function WithAuthorize(Component, path){
    const AuthorizedComponent = (props) => {
        const {roles} = props;

        if(hasPermission(roles, path)){
            return <Component {...props}/>
        }else{
            return <div>Not authorized!</div>
        }
    }

    const mapStateToProps = (state) => ({
        roles: selectAuthRoles(state),
    });
      
    return connect(mapStateToProps, null)(AuthorizedComponent);

}

export default WithAuthorize;