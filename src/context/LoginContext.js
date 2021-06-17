import React, { createContext, useReducer } from 'react';
import LoginReducer, { initialUserData } from '../reducers/LoginReducer';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const [userData, userDataDispatch] = useReducer(LoginReducer, initialUserData);
    return (
        <LoginContext.Provider value={{ userData, userDataDispatch }}>
            {props.children}
        </LoginContext.Provider>
    )
};

export default LoginContextProvider;