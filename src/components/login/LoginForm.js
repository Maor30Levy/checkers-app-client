import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { loginAction } from '../../actions/loginActions';
import { LoginContext } from '../../context/LoginContext';
import { loginUser } from '../../server/login';
import { emitAddUser } from '../../server/socket/loby-events';


const LoginForm = (props) => {
    const { userDataDispatch } = useContext(LoginContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (props.errorMessage !== "") {
            setErrorMessage(props.errorMessage)
        }
    }, [props.errorMessage])
    const isFormInvalid = () => {
        return email === '' || password === '';
    };

    const onBlurEmailInput = (event) => {
        const theEmail = event.target.value.trim();
        if (theEmail === '') {
            setEmail('');
            setIsEmailInputValid(false);
        } else {
            setEmail(theEmail);
            setIsEmailInputValid(true);
        }
    }

    const onBlurPasswordInput = (event) => {
        const thePassword = event.target.value.trim();
        setPassword(thePassword === '' ? '' : thePassword);
        setIsPasswordInputValid(thePassword === '' ? false : true);
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const resUserData = await loginUser({ email, password });
            userDataDispatch(loginAction(resUserData));
            emitAddUser(resUserData.user);
            history.push('/loby');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const onClickSubscribe = () => {
        props.setIsLoginMode(false);
    };
    return (
        <div>
            <h3>Login</h3>
            {
                errorMessage !== '' && <div className="error-message">{errorMessage}</div>
            }
            <form className="login-form" onSubmit={onSubmitForm}>
                <input placeholder="Email" onBlur={onBlurEmailInput} />
                {!isEmailInputValid && <div className="invalid-message">You must enter your Email.</div>}
                <input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
                {!isPasswordInputValid && <div className="invalid-message">You must enter your password.</div>}
                <div className="login-form__nav">
                    <button type="submit" disabled={isFormInvalid()}>Submit</button>
                    <div className="login-or-subscribe" onClick={onClickSubscribe}>Subscribe</div>
                </div>


            </form>
        </div>
    )
};


export default LoginForm;