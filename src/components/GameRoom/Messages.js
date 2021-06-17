import React, { useContext, useEffect } from 'react';
import { initCounterAction, setTypingAction } from '../../actions/gameRoomActions';
import { GameRoomContext } from '../../context/GameRoomContext';
import { LoginContext } from '../../context/LoginContext';
import { getTyping, offIncomeTyping } from '../../server/socket/gameroom-events';
import Typing from '../main/Typing';
import Message from './Message';

const Messages = ({ setMessageButton }) => {
    const { roomData, roomDataDispatch } = useContext(GameRoomContext);
    const { userData } = useContext(LoginContext);
    useEffect(() => {
        const typingListener = (isTyping) => {
            roomDataDispatch(setTypingAction(isTyping));
        };
        getTyping(typingListener);
        return () => {
            offIncomeTyping(typingListener);
        }
    }, [roomDataDispatch]);

    const onClickToggleMessages = () => {
        setMessageButton(true);
        roomDataDispatch(initCounterAction());
    }

    return (
        <div className="messages">
            {userData.windowWidth <= 430 &&
                <div className="message__toggle__off" onClick={onClickToggleMessages}>X</div>}
            {roomData.isTyping && <Typing />}
            {roomData.messages?.map((message) =>
            (
                <Message key={message.id}
                    message={message}
                />

            )
            )}
        </div>
    )
};

export default Messages;