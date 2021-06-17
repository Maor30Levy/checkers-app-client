import React, { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
const Message = ({ message }) => {
    const { userData } = useContext(LoginContext);
    const isMyMessage = message.user === userData.activeUser;
    return (
        <div className={isMyMessage ? "my-message" : 'message'} key={message.id}>
            <div className='username'>{message.user}</div>
            <div className='content'>{message.message}</div>
        </div>
    );
};

export default Message;