import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { LoginContext } from '../context/LoginContext';


const LoginRoute = ({ component: Component, ...rest }) => {
    const userData = useContext(LoginContext);
    return (
        <Route
            {...rest}
            component={(props) => {
                return (
                    userData.loggedIn ?
                        <Redirect to="/home" /> :
                        <Component {...props} />
                )
            }
            }
        />
    )
};

export default LoginRoute;
