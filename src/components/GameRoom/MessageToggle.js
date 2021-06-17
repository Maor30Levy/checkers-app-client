import React, { useContext, useEffect, useState } from 'react';
import { GameRoomContext } from '../../context/GameRoomContext';



const MessageToggle = ({ setMessageButton }) => {
    const { roomData } = useContext(GameRoomContext);
    const [unreadMessages, setUnreadMessages] = useState(false);
    useEffect(() => {
        setUnreadMessages(roomData.messagesCounter > 0);
    }, [roomData.messagesCounter])
    const onClickMessageButton = () => {
        setMessageButton(false)
    }
    return (
        <div className="messages__button_container">

            { unreadMessages &&
                <div className="messages__button_counter">{roomData.messagesCounter}</div>}
            <div className="messages__button" onClick={onClickMessageButton}>
            </div>
            <div className="messages__button__pointer">
            </div>

            <div className="messages__shadow__body blur" onClick={onClickMessageButton}>
            </div>
            <div className="messages__shadow__pointer blur">
            </div>

        </div>
    )
};

export default MessageToggle;