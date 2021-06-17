import { nanoid } from 'nanoid';
import React, { useContext, useEffect } from 'react';
import { addMessageAction, setCounterAction } from '../../actions/gameRoomActions';
import { GameRoomContext } from '../../context/GameRoomContext';
import { LoginContext } from '../../context/LoginContext';
import { broadcastMessage, getMessage, offIncomeMessage, typing } from '../../server/socket/gameroom-events';

const AddMessage = () => {
    const { roomData, roomDataDispatch } = useContext(GameRoomContext);
    const { userData } = useContext(LoginContext);
    useEffect(() => {
        const incomeMessageListener = (message) => {
            roomDataDispatch(addMessageAction(message));
            roomDataDispatch(setCounterAction());
        };
        getMessage(incomeMessageListener);
        return () => {
            offIncomeMessage(incomeMessageListener);
        }
    }, [roomDataDispatch]);

    const user = userData.activeUser;
    const onSubmitForm = (event) => {
        event.preventDefault();
        const messageValue = event.target.children[0].children[0].value.trim();
        if (messageValue.length > 0) {
            const message = {
                message: messageValue,
                id: nanoid(),
                user
            };
            roomDataDispatch(addMessageAction(message));
            typing(roomData.opponentSocket, false);
            broadcastMessage(roomData.opponentSocket, message);
            event.target.children[0].children[0].value = "";
        }
    };

    const onInputMessage = (event) => {
        const numOfChars = event.target.value.length;
        const state = numOfChars === 1 ? true : false;
        if (numOfChars === 1 || numOfChars === 0)
            typing(roomData.opponentSocket, state);
    };



    return (
        <form onSubmit={onSubmitForm}>
            <div className="message-input">
                <input type="text" placeholder="Type Message" onInput={onInputMessage} />
                <button type="submit">Send</button>
            </div>
        </form>

    );
};

export default AddMessage;