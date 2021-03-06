import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import validator from 'validator';
import { loginAction } from '../../actions/loginActions';
import { LoginContext } from '../../context/LoginContext';
import { subscribeUser } from '../../server/login';
import { emitAddUser } from '../../server/socket/loby-events';
import { getImageBuffer } from '../../server/users';

const SubscribeForm = (props) => {
    const { userDataDispatch } = useContext(LoginContext);
    const history = useHistory();
    const [inputClasses, setInputClasses] = useState(["", "", "", "", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", "", ""]);
    const [validInputs, setValidInputs] = useState([false, false, false, false, false]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [avatarBuffer, setAvatarBuffer] = useState(null);


    const isFormInvalid = () => {
        return validInputs.includes(false);
    };

    const setStateOfInputs = (message, inputClass, isvalidInput, inputindex) => {
        const newInavlidMessages = [...invalidMessages];
        const newInputClasses = [...inputClasses];
        const newValidInputs = [...validInputs];
        newInavlidMessages[inputindex] = message;
        setInvalidMessages(newInavlidMessages);
        newInputClasses[inputindex] = inputClass;
        setInputClasses(newInputClasses);
        newValidInputs[inputindex] = isvalidInput;
        setValidInputs(newValidInputs);
    };

    const validateInput = (
        value,
        inputindex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {


        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs("", "", true, inputindex);
                setValue(value);
            } else {
                setStateOfInputs(invalidValueMessage, "input-invalid", false, inputindex);
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false, inputindex);
        }
    };

    const onBlurUsername = (event) => {
        const newUsername = event.target.value.trim();
        const isUsenamevalid = (value) => {
            return true;
        };
        validateInput(
            newUsername,
            0,
            isUsenamevalid,
            setUsername,
            "You must enter username",
            "Username could not be MOSHE!!!"
        );
    };

    const onBlurEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(
            newEmail,
            1,
            validator.isEmail,
            setEmail,
            "You must enter your email",
            "Email invalid"
        );
    };

    const onBlurPassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            return passwordRegex.test(value);
        };
        validateInput(
            newPassword,
            2,
            isPasswordValid,
            setPassword,
            "You must enter password",
            "Password must contain capital and regular characters, numbers and must have at least 8 characters"
        );
    };

    const onBlurPasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = () => {
            return password === passwordRepeated;
        };
        validateInput(
            passwordRepeated,
            3,
            isPasswordRepeatedValid,
            () => { },
            "You must enter again your password",
            "The two passwords not identical"
        );
    };

    const onSubmitform = async (event) => {
        event.preventDefault();
        try {
            const request = { email, password, username };
            if (!!avatarBuffer) request.avatar = avatarBuffer;
            const userData = await subscribeUser(request);
            userData.avatar = !!avatarBuffer ? Buffer.from(avatarBuffer) : avatarBuffer;
            userDataDispatch(loginAction(userData));
            emitAddUser(username);
            history.push('/loby');
        } catch (err) {
            const errorMessageArray = ["", "", "", "", ""]
            errorMessageArray[err.index || 4] = err.message;
            setInvalidMessages(errorMessageArray)
        }

    };

    const onClickLogin = () => {
        props.setIsLoginMode(true);
    }

    const onBlurAvatar = async (event) => {
        const file = event.target.files[0];
        const validateAvatarInput = () => {
            const size = file?.size;
            const type = file?.type;
            return (
                (file === undefined) ||
                (size <= 1000000 && (!!type.match(/^image/)))

            )
        };
        const setAvatarValue = async () => {
            let buffer = null;
            if (!!file) buffer = await getImageBuffer(file);
            setAvatarBuffer(buffer);
        }
        try {
            if (validateAvatarInput()) {
                await setAvatarValue();
                setStateOfInputs("", "", true, 4);
            }
            else setStateOfInputs("File must be an image and less from 1MB.", "input-invalid", false, 4);


        } catch (err) {
            console.log(err.message);
        }

    };

    return (
        <div className="login-form">
            <h3>Subscribe</h3>
            <form onSubmit={onSubmitform}>
                <input placeholder="Username" className={inputClasses[0]} onBlur={onBlurUsername} />
                {invalidMessages[0] !== "" && <div className="invalid-message">{invalidMessages[0]}</div>}
                <input placeholder="Email" className={inputClasses[1]} onBlur={onBlurEmail} />
                {invalidMessages[1] !== "" && <div className="invalid-message">{invalidMessages[1]}</div>}
                <input type="password" placeholder="Password" className={inputClasses[2]} onBlur={onBlurPassword} />
                {invalidMessages[2] !== "" && <div className="invalid-message">{invalidMessages[2]}</div>}
                <input type="password" placeholder="Repeat on password" className={inputClasses[3]} onBlur={onBlurPasswordRepeated} />
                {invalidMessages[3] !== "" && <div className="invalid-message">{invalidMessages[3]}</div>}
                <input type="file" placeholder="Upload avatar" className={inputClasses[4]} onBlur={onBlurAvatar} />
                {invalidMessages[4] !== "" && <div className="invalid-message">{invalidMessages[4]}</div>}
                <div className="login-form__nav">
                    <button type="submit" disabled={isFormInvalid()}>Submit</button>
                    <div className="login-or-subscribe" onClick={onClickLogin}>Login</div>
                </div>
            </form>
        </div>
    );
};

export default SubscribeForm;