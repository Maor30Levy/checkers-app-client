import React, { useContext } from 'react';
import { setOpponentAction } from '../../actions/gameRoomActions';
import { GameRoomContext } from '../../context/GameRoomContext';
import { LoginContext } from '../../context/LoginContext';
import { sendMessageToUser } from '../../server/socket/loby-events';

const MessageUser = ({ userReciepient, setUserReciepient }) => {
    const { userData } = useContext(LoginContext);
    const { roomDataDispatch } = useContext(GameRoomContext);
    const onClickSendRequest = () => {
        sendMessageToUser(userReciepient, userData.activeUser);
        roomDataDispatch(setOpponentAction(userReciepient));
        setUserReciepient(null);
    }
    const onClickCancel = () => {

        setUserReciepient(null);
    }

    return (
        <div className="message-user">
            <div className="message-user__body">
                <h4>Do you want to invite {userReciepient} to a match?</h4>
                <button onClick={onClickSendRequest}>Send Request</button>
                <button onClick={onClickCancel} className="cancel">Cancel</button>
            </div>
        </div>

    )
};

export default MessageUser;