import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';
import LoginForm from './LoginForm';
import SubscribeForm from './SubscribeForm';


const LoginPage = (props) => {

    const errorMessage = props.location.state?.needToLogin ?
        "You need to login" : "";
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { userData } = useContext(LoginContext);
    const [openClass, setOpenClass] = useState('')
    useEffect(() => {
        setOpenClass(!userData.activeHeader ? ' header__gap' : '');

    }, [userData.activeHeader]);

    return (
        <div className={"login-page" + openClass}>
            <div className="login-page__form">
                {isLoginMode ?
                    <LoginForm setIsLoginMode={setIsLoginMode} errorMessage={errorMessage} /> :
                    <SubscribeForm setIsLoginMode={setIsLoginMode} />}
            </div>
        </div>
    )
};

export default LoginPage;