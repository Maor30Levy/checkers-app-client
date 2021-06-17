import React from 'react';
const ErrorMessage = ({ errorMessage, setErrorMessage }) => {
    const onClickOK = () => {
        setErrorMessage('')
    };
    return (
        <div className="error-message-container">
            <div className="error-message__body">
                <h4>{errorMessage}</h4>
                <button onClick={onClickOK}>OK</button>
            </div>
        </div>
    );
};

export default ErrorMessage;