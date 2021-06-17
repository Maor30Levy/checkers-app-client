import React, { useContext, useEffect, useState } from 'react';
import { GameRoomContext } from '../../context/GameRoomContext';
import ErrorMessage from './ErrorMessage';
import GameRoomMain from './GameRoomMain';
import Messages from './Messages';
import { initRoomAction } from '../../actions/gameRoomActions';
import { getOpponentForfeited, offOpponentForfeited } from '../../server/socket/gameroom-events';
import { useHistory } from 'react-router';
import { initBoardAction } from '../../actions/BoardActions';
import { BoardContext } from '../../context/BoardContext';
import { emitAddUser } from '../../server/socket/loby-events';
import { LoginContext } from '../../context/LoginContext';
import ForfeitMessage from './ForfeitMessage';
import MessageToggle from './MessageToggle';

const GameRoom = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { roomData, roomDataDispatch } = useContext(GameRoomContext);
    const { boardStateDispatch } = useContext(BoardContext);
    const { userData } = useContext(LoginContext);
    const [isGameForfieted, setIsGameForfieted] = useState(false);
    const history = useHistory();
    const [openClass, setOpenClass] = useState('');
    const [messageButton, setMessageButton] = useState(true);
    useEffect(() => {
        setOpenClass(!userData.activeHeader ? ' header__gap' : '');

    }, [userData.activeHeader]);
    useEffect(() => {
        const opponentForfeitedListener = () => {
            setIsGameForfieted(true);
            roomDataDispatch(initRoomAction());
            boardStateDispatch(initBoardAction());
            emitAddUser(userData.activeUser);
            history.push('/loby');
        };
        getOpponentForfeited(opponentForfeitedListener);
        return () => {
            offOpponentForfeited(opponentForfeitedListener);
        }
    }, [roomDataDispatch, boardStateDispatch, history, userData.activeUser]);


    return (
        <div className={"game-room" + openClass}>
            {isGameForfieted && <ForfeitMessage
                setIsGameForfieted={setIsGameForfieted}
                username={roomData.opponent}
            />}
            {(userData.windowWidth <= 430 && messageButton) &&
                <MessageToggle
                    setMessageButton={setMessageButton}
                />}
            {(userData.windowWidth > 430 || !messageButton) &&
                <Messages
                    setMessageButton={setMessageButton}
                />}
            <GameRoomMain
                setErrorMessage={setErrorMessage}
            />

            {errorMessage !== '' &&
                <ErrorMessage
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />}
        </div>
    )
};

export default GameRoom;